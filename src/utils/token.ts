import { encryptToken, decryptToken } from '../utils/crypto-utils';

interface TokenStorage {
  encryptedToken?: string;
  tokenExpiry?: number;
}

class Token {
  private static readonly DEFAULT_EXPIRATION = 3_600_000;

  async saveEncryptedToken(token: string, expiresIn: number = 2_592_000_000): Promise<void> {
    try {
      const encrypted = await encryptToken(token);
      const storageData: TokenStorage = {
        encryptedToken: JSON.stringify(encrypted),
        tokenExpiry: Date.now() + expiresIn
      };

      await chrome.storage.local.set(storageData);
    } catch (error) {
      console.error('Error saving encrypted token:', error);
      throw new Error('Failed to save encrypted token');
    }
  }

  async getDecryptedToken(): Promise<string | null> {
    try {
      const data = await chrome.storage.local.get(['encryptedToken', 'tokenExpiry']) as TokenStorage;
      
      if (!Token.isTokenValid(data)) {
        return null;
      }

      // Parseamos y validamos la estructura
      const encrypted: unknown = JSON.parse(data.encryptedToken!);
      return await decryptToken(encrypted);
    } catch (error) {
      console.error("Error getting token:", error);
      await this.clearToken(); // Limpiamos token inválido
      return null;
    }
  }

  async clearToken(): Promise<void> {
    await chrome.storage.local.remove(['encryptedToken', 'tokenExpiry']);
  }

  // Método estático privado para validación
  private static isTokenValid(data: TokenStorage): boolean {
    return !!data.encryptedToken && 
           !!data.tokenExpiry && 
           data.tokenExpiry > Date.now();
  }

  async verificate() {
    const token = await this.getDecryptedToken();
    try {
      const res = await fetch('https://account.astian.xyz/api/gateway/check-authentication', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`
        },
      });

      if (res.ok) {
        //const data = await res.json();
        console.log('yess')
      } else {
        console.log('Error response:', res);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  async ngOnInit(url) {
    //Get state
    const state: string | null = localStorage.getItem('state');

    //get code verifier
    const code_verifier: string | null =
      localStorage.getItem('code_verifier');

    //Get current URL
    const query: URLSearchParams = new URLSearchParams(url.search);
    //Checking state
    if (state && state === query.get('state')) {
      const body = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: '9e82bbd1-be17-488d-87e9-2385f1993765',
        redirect_uri: 'https://oauth.astian.xyz/callback',
        code_verifier: code_verifier || '',
        code: query.get('code') || '',
      });

      //Make request to the Aouth2 server to get access token and refresh token
      try {
        const res = await fetch('https://account.astian.xyz/api/oauth/token', {
          method: 'POST',
          body: body.toString(),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
          },
        });

        if (res.ok) {
          const data = await res.json();
          this.saveEncryptedToken(data.access_token);
        } else {
          console.log('Error response:', res);
          window.location.href = '/sign-in';
        }
      } catch (error) {
        console.error('Fetch error:', error);
        window.location.href = '/sign-in';
      }
    } else {
      window.location.href = '/sign-in';
    }
  }
  
}

export default Token;
