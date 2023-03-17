import { MemoryStorageProvider } from './memory-storage-provider';

function generateRandomString(length: number): string {
  const randomValues = new Uint32Array(length);
  window.crypto.getRandomValues(randomValues);
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(randomValues[i] % charactersLength);
  }
  return result;
}

describe('Memory storage provider', () => {
  it('should not crash', async () => {
    var rnd = generateRandomString(64);
    var val = (Math.random() * 1000).toString();
    var prov = new MemoryStorageProvider();
    expect(prov.getItem(rnd)).toBe(null);
    prov.setItem(rnd, val);
    expect(prov.getItem(rnd)).toBe(val);
  });
});
