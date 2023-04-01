import { Queue } from '@/core/queue';

export default class ImageCache {
  static CACHED_IMAGES = 8;
  oldimages: Queue<string> = new Queue<string>();

  formImageURL(permanent: boolean, file: File): string | undefined {
    while (this.oldimages.size() >= ImageCache.CACHED_IMAGES) {
      URL.revokeObjectURL(this.oldimages.dequeue());
    }

    if (!file.type.startsWith('image/')) return undefined;

    const url = URL.createObjectURL(file);
    if (!permanent) this.oldimages.enqueue(url);
    return url;
  }
}
