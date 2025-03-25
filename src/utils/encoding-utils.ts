// Conversión segura entre ArrayBuffer y Base64
export function bufferToBase64(buffer: ArrayBuffer|Uint8Array): string {
  const bytes = new Uint8Array(buffer);
  return btoa(String.fromCharCode(...bytes));
}

export function base64ToBuffer(base64: string): Uint8Array {
  return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}
