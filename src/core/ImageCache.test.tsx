import ImageCache from './ImageCache';

describe('ImageCache', () => {
  let imageCache: ImageCache;

  let originalCreate: (obj: Blob | MediaSource) => string;
  let originalRevoke: (url: string) => void;


  beforeEach(() => {
    jest.clearAllMocks();
    imageCache = new ImageCache();
    originalCreate = global.URL.createObjectURL;
    originalRevoke = global.URL.revokeObjectURL;

    const mockCreateObjectURL = jest.fn(() => 'blob: HAHA');
    global.URL.createObjectURL = mockCreateObjectURL;
    global.URL.revokeObjectURL = jest.fn();
  });

  afterEach(() => {
    global.URL.createObjectURL = originalCreate;
    global.URL.revokeObjectURL = originalRevoke;
  });


  describe('formImageURL', () => {
    it('returns undefined if file type is not an image', () => {
      const file = new File(['file content'], 'file.pdf', { type: 'application/pdf' });
      const url = imageCache.formImageURL(true, file);
      expect(url).toBeUndefined();
    });

    it('returns a valid URL for a valid image file', () => {
      const file = new File(['file content'], 'file.jpg', { type: 'image/jpeg' });
      const url = imageCache.formImageURL(true, file);
      expect(url).toMatch(/^blob:/);
    });

    it('returns undefined if file type is not an image', () => {
      const file = new File(['file content'], 'file.pdf', { type: 'application/pdf' });
      const url = imageCache.formImageURL(true, file);
      expect(url).toBeUndefined();
    });

    it('stores a maximum of 8 images', () => {
      const files: File[] = [];

      for (let i = 0; i < ImageCache.CACHED_IMAGES + 5; i++)
        files.push(
          new File(['file' + i.toString() + ' content'], 'file' + i.toString() + '.jpg', {
            type: 'image/jpeg',
          })
        );

      files.forEach((file) => imageCache.formImageURL(false, file));

      const oldImages = imageCache.oldimages.toArray();
      expect(oldImages.length).toBe(ImageCache.CACHED_IMAGES);
      expect(oldImages.every((url) => url.startsWith('blob:'))).toBe(true);

      expect(imageCache.oldimages.size()).toBe(ImageCache.CACHED_IMAGES);
    });

    it('does not store image URLs when permanent is false', () => {
      const file = new File(['file content'], 'file.jpg', { type: 'image/jpeg' });
      for (let i = 0; i < ImageCache.CACHED_IMAGES + 1; i++) {
        const url = imageCache.formImageURL(true, file);
        expect(url).toMatch(/^blob:/);
      }
      expect(imageCache.oldimages.size()).toBe(0);
    });
  });
});
