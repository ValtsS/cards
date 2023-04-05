export class LocalStorage {
  setItem(key: string, value: string): void {
    console.log(key, value);
    window.localStorage.setItem(key, value);
  }

  getItem(key: string): string | null {
    const data = window.localStorage.getItem(key);
    return data;
  }
}
