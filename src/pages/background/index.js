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


/*
chrome.webRequest.onAuthRequired.addListener(
  (details, callbackFn) => {
    const getCredentialsAsync = () => {
      return new Promise((resolve, reject) => {
        chrome.storage.local.get(
          ['isPremium', 'username', 'sessionAuthToken'],
          (storage) => {
            if (chrome.runtime.lastError) {
              reject(new Error(chrome.runtime.lastError))
            } else {
              const credentials = storage.isPremium
                ? {
                    username: storage.username,
                    password: storage.sessionAuthToken,
                  }
                : freeCredentials

              resolve({ authCredentials: credentials })
            }
          }
        )
      })
    }

    if (isFirefox) {
      return getCredentialsAsync()
    } else {
      getCredentialsAsync().then((credentials) => {
        callbackFn(credentials)
      })
    }
  },
  { urls: ['<all_urls>'] },
  [isFirefox ? 'blocking' : 'asyncBlocking']
)

if (isFirefox) {
  browser.proxy.onRequest.addListener(handleProxyRequest, {
    urls: ['<all_urls>'],
  })
}
*/

/*
chrome.alarms.create('fetchUserData', { periodInMinutes: 6 * 60 })

chrome.alarms.onAlarm.addListener((alarm) => {
  chrome.storage.local.get(['sessionAuthToken'], (storage) => {
    if (!storage.sessionAuthToken) return
    if (alarm.name === 'fetchUserData') {
      apiFetch('api/refresh_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token ' + storage.sessionAuthToken,
        },
      })
        .then(async (response) => {
          if (!response.ok) {
            const err = await response.json()
            logout()
            throw err
          }
          return response.json()
        })
        .then((data) => {
          chrome.storage.local.set(data)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  })
})

chrome.webNavigation.onCommitted.addListener((details) => {
  if (
    details.url?.startsWith('chrome://') ||
    details.url?.startsWith('chrome-extension://') ||
    details.url?.startsWith('https://chromewebstore.google.com/')
  )
    return

  chrome.storage.local.get(
    ['spoofGeolocation', 'isConnected', 'currentLocation'],
    (storage) => {
      if (
        storage.spoofGeolocation &&
        storage.isConnected &&
        storage.currentLocation
      ) {
        chrome.scripting.executeScript({
          target: { tabId: details.tabId, allFrames: true },
          world: 'MAIN',
          injectImmediately: true,
          func: spoofGeolocation,
          args: [
            {
              latitude: storage.currentLocation.latitude,
              longitude: storage.currentLocation.longitude,
            },
          ],
        })
      }
    }
  )
})
*/
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if(message.type === 'handleAuthorization') {

  }
})
