class SignInComponent {
  /**
   * Generate a random string
   * @param  length
   * @returns String
   */
  generateCode(length = 40): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  sha256(plain: string): Promise<ArrayBuffer> {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }

  /**
   * Encode a code_verifier (ArrayBuffer)
   * @param buffer ArrayBuffer
   * @returns String
   */
  base64urlencode(buffer: ArrayBuffer): string {
    // Convert ArrayBuffer to Uint8Array
    const bytes = new Uint8Array(buffer);

    // Convert each byte to its char equivalent
    let binary = '';
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });

    // Convert binary string to base64
    const base64 = btoa(binary);

    // Make the base64 string URL-safe
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  /**
   * Generate a new code challenge
   *
   * @returns Promise<string>
   */
  async codeChallenge(): Promise<string> {
    const code_verifier = this.generateCode(128); // Generate 128 char random string
    localStorage.setItem('code_verifier', code_verifier);

    // Generate SHA-256 hash of the code_verifier
    const hashed = await this.sha256(code_verifier);
    console.log('hashed = ' + hashed);

    // Encode the hash into base64-url safe string
    const base64encoded = this.base64urlencode(hashed);

    return base64encoded;
  }

  /**
   * Redirect to the OAuth2 server to authorize the application
   */
  async signIn() {
    // Generate the state code and store it in session
    const state = this.generateCode(40);
    localStorage.setItem('state', state);

    // Generate code_challenge
    const code_challenge = await this.codeChallenge();

    // Build query string
    const queryParams = new URLSearchParams({
      client_id: '9e82bbd1-be17-488d-87e9-2385f1993765',
      redirect_uri: 'https://oauth.astian.xyz/callback',
      response_type: 'code',
      scope: '*',
      state: state,
      code_challenge: code_challenge,
      code_challenge_method: 'S256',
      prompt: 'none',
    });

    // Redirect to OAuth2 authorization server
    //window.location.href = `https://accounts.elyerr.xyz/oauth/authorize?${queryParams.toString()}`;
    const url = `https://oauth.astian.xyz/oauth?${queryParams.toString()}`;
    browser.tabs.create({ url: url });
    //window.open(url);
  }
}

export default SignInComponent;
