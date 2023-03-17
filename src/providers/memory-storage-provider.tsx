import { LocalStorageProvider } from 'providers/local-storage-provider';

export class MemoryStorageProvider implements LocalStorageProvider {
  private data: { [key: string]: string } = {};

  setItem(key: string, value: string): void {
    this.data[key] = value;
  }

  getItem(key: string): string | null {
    return this.data[key] || null;
  }
}
