import { Cards } from '@/providers';
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

describe('CardValidator', () => {
  let validator: CardValidator;

  beforeEach(() => {
    validator = new CardValidator();
  });

  describe('isValid', () => {
    it('returns true for a valid card', () => {
      const card = Cards.alloc();
      card.title = 'Test Title';
      card.text = 'Test Text';
      card.price = '100';
      card.addedat = new Date().getTime();
      card.rating = 3;
      card.imageUrl = 'http://example.com/image.png';
      card.flipimg = false;
      card.grayscale = true;
      expect(validator.isValid(card)).toBe(true);
      expect(validator.errors).toEqual({});
    });

    it('returns false and sets errors for an invalid card', () => {
      const card = Cards.alloc();
      expect(validator.isValid(card)).toBe(false);
      expect(validator.errors).toEqual({
        title: CardValidator.ERRORS.TITLE_REQUIRED,
        text: CardValidator.ERRORS.TEXT_REQUIRED,
        price: CardValidator.ERRORS.PRICE_REQUIRED,
        addedat: CardValidator.ERRORS.ADDED_AT_REQUIRED,
        rating: CardValidator.ERRORS.RATING_REQUIRED,
        bigimagemage: CardValidator.ERRORS.IMAGE_REQUIRED,
        radioflip: CardValidator.ERRORS.ORIENTATION_REQUIRED,
        grayscale: CardValidator.ERRORS.GRAYSCALE_REQUIRED,
      });
    });

    it('returns false and sets errors for an invalid card data', () => {
      const card = Cards.alloc();
      card.title = 'Test Title';
      card.text = 'Test Text';
      card.price = '-100';
      card.addedat = new Date(new Date().getFullYear() + 100, 1, 1).getTime();
      card.rating = undefined;
      card.imageUrl = 'http://example.com/image.png';
      card.flipimg = false;
      expect(validator.isValid(card)).toBe(false);
      expect(validator.errors).toEqual({
        addedat: CardValidator.ERRORS.ADDED_AT_FUTURE,
        price: CardValidator.ERRORS.PRICE_VALID,
        grayscale: CardValidator.ERRORS.GRAYSCALE_REQUIRED,
        rating: CardValidator.ERRORS.RATING_REQUIRED,
      });
    });

    it('returns false and sets errors for an invalid card data #2', () => {
      const card = Cards.alloc();
      card.title = 'Test Title';
      card.text = 'Test Text';
      card.price = '-100';
      card.addedat = undefined;
      card.rating = undefined;
      card.imageUrl = 'http://example.com/image.png';
      card.flipimg = false;
      expect(validator.isValid(card)).toBe(false);
      expect(validator.errors).toEqual({
        addedat: CardValidator.ERRORS.ADDED_AT_REQUIRED,
        price: CardValidator.ERRORS.PRICE_VALID,
        grayscale: CardValidator.ERRORS.GRAYSCALE_REQUIRED,
        rating: CardValidator.ERRORS.RATING_REQUIRED,
      });
    });

    it('check date validation rules', () => {
      expect(validator.onDateValidate('')).toBe(CardValidator.ERRORS.ADDED_AT_REQUIRED);
      expect(validator.onDateValidate('garbled')).toBe(CardValidator.ERRORS.ADDED_AT_REQUIRED);
      expect(validator.onDateValidate('2000-13-01')).toBe(CardValidator.ERRORS.ADDED_AT_REQUIRED);
      expect(validator.onDateValidate('2000-01-13')).toBe(true);
      expect(validator.onDateValidate('2999-01-13')).toBe(CardValidator.ERRORS.ADDED_AT_FUTURE);
    });

    it('check price validation rules', () => {
      expect(validator.onPriceValidate(0.01)).toBe(true);
      expect(validator.onPriceValidate(-0.01)).toBe(CardValidator.ERRORS.PRICE_VALID);
    });

    it('check rating validation rules', () => {
      expect(validator.onRatingValidate('')).toBe(CardValidator.ERRORS.RATING_REQUIRED);
      expect(validator.onRatingValidate('x')).toBe(CardValidator.ERRORS.RATING_REQUIRED);
      expect(validator.onRatingValidate('5')).toBe(true);
    });

    it('check flip validation rules', () => {
      expect(validator.onFlipValidate('')).toBe(CardValidator.ERRORS.ORIENTATION_REQUIRED);
      expect(validator.onFlipValidate('-=DUMMY=-')).toBe(CardValidator.ERRORS.ORIENTATION_REQUIRED);
    });

    it.each(Object.values(CardValidator.IMAGE_ORIENTATION))(
      'returns true for valid flip orientation: %s',
      (orientation) => {
        expect(validator.onFlipValidate(orientation)).toBe(true);
      }
    );

    it('check image validation rules with no upload', () => {
      const fileList = mockFileList([]);
      expect(fileList.length).toBe(0);
      expect(validator.onImageValidate(fileList)).toBe(CardValidator.ERRORS.IMAGE_REQUIRED);
    });

    it('check image validation rules with non image file', () => {
      const fileList = mockFileList([mockFile('PDF', 1024)]);
      expect(fileList.length).toBe(1);
      expect(validator.onImageValidate(fileList)).toBe(CardValidator.ERRORS.IMAGE_REQUIRED);
    });
  });
});

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
