import { CardFormValues, CardValidator } from './card-validator';

const mockFile = (type: string, size: number): File => {
  const fileName = (Math.random() * 1000).toString().replace('.', '') + type.toLowerCase();
  const file = new File([''], fileName, { type: type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
};
const mockFileList = (files: File[]): FileList => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('name', 'file-upload');
  input.multiple = true;
  const fileList: FileList = Object.create(input.files);
  for (let i = 0; i < files.length; i++) {
    fileList[i] = files[i];
  }
  Object.defineProperty(fileList, 'length', { value: files.length });
  return fileList;
};

describe('CardValidator Prepare Card', () => {
  const originalCreate = global.URL.createObjectURL;
  const originalRevoke = global.URL.revokeObjectURL;
  beforeEach(() => {
    jest.clearAllMocks();
    const mockCreateObjectURL = jest.fn(() => 'blob: HAHA');
    global.URL.createObjectURL = mockCreateObjectURL;
    global.URL.revokeObjectURL = jest.fn();
  });

  afterEach(() => {
    global.URL.createObjectURL = originalCreate;
    global.URL.revokeObjectURL = originalRevoke;
  });

  describe('prepareCard', () => {
    const validator = new CardValidator();
    const validValues: CardFormValues = {
      title: 'Test Card',
      text: 'This is a test card.',
      price: 9.99,
      addedat: '2022-01-01',
      rating: '3',
      grayscale: true,
      bigimagemage: mockFileList([mockFile('image/jpg', 1024)]),
      radioflip: 'Normal',
    };

    it('should prepare card data with valid input', () => {
      const card = validator.prepareCard(validValues);
      expect(card.title).toBe('Test Card');
      expect(card.text).toBe('This is a test card.');
      expect(card.price).toBe('9.99');
      expect(card.addedat).toEqual(new Date('2022-01-01').getTime());
      expect(card.rating).toBe(3);
      expect(card.grayscale).toBe(true);
      expect(card.imageUrl).toBe('blob: HAHA');
      expect(card.flipimg).toBe(false);
    });

    it('should prepare card data with flipped image', () => {
      const values: CardFormValues = {
        ...validValues,
        radioflip: 'Flipped',
      };
      const card = validator.prepareCard(values);
      expect(card.flipimg).toBe(true);
    });

    it('should fail due to missing orientation', () => {
      const values: CardFormValues = {
        ...validValues,
        radioflip: '',
      };
      const card = validator.prepareCard(values);
      expect(card).toBeTruthy();
      expect(card.flipimg).toBe(undefined);
    });
    it('should fail due to missing rating', () => {
      const values: CardFormValues = {
        ...validValues,
        rating: '',
        addedat: 'trash',
      };
      const card = validator.prepareCard(values);
      expect(card).toBeTruthy();
      expect(card.rating).toBe(0);
      expect(card.addedat).toBe(undefined);
    });
  });
});
