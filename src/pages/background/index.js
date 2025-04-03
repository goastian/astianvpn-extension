import { browser } from 'webextension-polyfill';

//import { isFirefox, freeCredentials } from 'utils/constants'
import { isFirefox } from '../../utils/constants'
import setBadge from '../../utils/setBadge'
import apiFetch from '../../utils/apiFetch'
import logout from '../../utils/logout'
import spoofGeolocation from '../../utils/spoofGeolocation'

import Token from '../../utils/token.ts';

chrome.runtime.onInstalled.addListener((details) => {
  setBadge()
})

chrome.runtime.onStartup.addListener(setBadge)

//escuhar rutas
chrome.webNavigation.onCommitted.addListener((details) => {
  const url = new URL(details.url);
  // Si la URL contiene el token de OAuth2
  if (url.pathname === '/callback') {
    const token = new Token();
    token.ngOnInit(url);
  }
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'enableVPN') {
    enableVPN(sendResponse);
    return true; // Indica que usaremos sendResponse asíncronamente
  } else if (message.action === 'disableVPN') {
    disableVPN(sendResponse);
    return true;
  }
});

async function enableVPN(sendResponse) {
  try {
    // Paso 1: Verificar permisos
    const hasPermissions = await checkPermissions();
    if (!hasPermissions) return false;

    // Paso 2: Configurar proxy
    const proxySuccess = await configureProxy();
    if (!proxySuccess) return false;

    // Paso 3: Actualizar estado
    await updateExtensionState(true);
    return true;
  } catch (error) {
    console.error("Error en enableVPN:", error);
    return false;
  }
}

async function disableVPN() {
  try {
    // Paso 1: Desactivar configuración de proxy
    const proxyRemoved = await removeProxySettings();
    if (!proxyRemoved) return false;

    // Paso 2: Actualizar estado de la extensión
    await updateExtensionState(false);
    return true;
  } catch (error) {
    console.error("Error en disableVPN:", error);
    return false;
  }
}

async function removeProxySettings() {
  return new Promise((resolve) => {
    chrome.proxy.settings.set(
      {
        value: { proxyType: "none" },
        scope: "regular"
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error("Error al desactivar proxy:", chrome.runtime.lastError);
          
          // Intento alternativo con configuración directa
          chrome.proxy.settings.clear({}, () => {
            if (chrome.runtime.lastError) {
              console.error("Error alternativo:", chrome.runtime.lastError);
              resolve(false);
            } else {
              console.log("Proxy desactivado con método alternativo");
              resolve(true);
            }
          });
        } else {
          console.log("Proxy desactivado exitosamente");
          resolve(true);
        }
      }
    );
  });
}

async function checkPermissions() {
  return new Promise((resolve) => {
    chrome.permissions.contains(
      {
        permissions: ["browsingData", "proxy"]
      },
      (result) => {
        if (result) {
          resolve(true);
        } else {
          chrome.permissions.request(
            {
              permissions: ["browsingData", "proxy"]
            },
            (granted) => {
              resolve(granted);
            }
          );
        }
      }
    );
  });
}

async function updateExtensionState(isEnabled) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ vpnStatus: isEnabled }, () => {
      chrome.action.setIcon({
        path: isEnabled ? "icon.png" : "icon.png"
      });
      resolve();
    });
  });
}

function configureProxy(callback) {
  return new Promise((resolve) => {
    const proxyConfig = {
      proxyType: "manual",
      http: `72.144.125.232:1080`,
      https: `72.144.125.232:1080`,
      socks: `72.144.125.232:1080`,
      socksVersion: 5,
      proxyDNS: true
    };

    // Intento principal de configuración
    chrome.proxy.settings.set(
      {
        value: proxyConfig,
        scope: "regular"
      },
      () => {
        if (!chrome.runtime.lastError) {
          console.log("Proxy configurado exitosamente");
          return resolve(true);
        }

        console.warn("Primer intento fallido, intentando alternativa...");
        
        // Configuración alternativa
        const fallbackConfig = {
          proxyType: "manual",
          socks: `socks5://tu.ip.servidor:1080`,
          socksVersion: 5,
          proxyDNS: true
        };

        chrome.proxy.settings.set(
          {
            value: fallbackConfig,
            scope: "regular"
          },
          () => {
            if (chrome.runtime.lastError) {
              console.error("Error final:", chrome.runtime.lastError);
              resolve(false);
            } else {
              console.log("Proxy configurado con método alternativo");
              resolve(true);
            }
          }
        );
      }
    );
  });
}

// Inicializar estado
chrome.storage.local.get('vpnStatus', (result) => {
  if (result.vpnStatus) {
    enableVPN();
  }
});
