import { Queue } from '@/core/queue';

export default class ImageCache {
  static CACHED_IMAGES = 8;
  static oldimages: Queue<string> = new Queue<string>();

  static formImageURL(permanent: boolean, file: File): string | undefined {
    while (ImageCache.oldimages.size() >= ImageCache.CACHED_IMAGES) {
      URL.revokeObjectURL(ImageCache.oldimages.dequeue());
    }

    if (!file.type.startsWith('image/')) return undefined;

    const url = URL.createObjectURL(file);
    if (!permanent) ImageCache.oldimages.enqueue(url);

    return url;
  }
}
