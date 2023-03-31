import { CardData } from '@/providers';
import { CardValidator } from './card-validator';

describe('CardValidator', () => {
  let validator: CardValidator;

  beforeEach(() => {
    validator = new CardValidator();
  });

  describe('isValid', () => {
    it('returns true for a valid card', () => {
      const card = new CardData();
      card.title = 'Test Title';
      card.text = 'Test Text';
      card.price = '100';
      card.addedat = new Date();
      card.rating = 3;
      card.imageUrl = 'http://example.com/image.png';
      card.flipimg = false;
      card.grayscale = true;
      expect(validator.isValid(card)).toBe(true);
      expect(validator.errors).toEqual({});
    });

    it('returns false and sets errors for an invalid card', () => {
      const card = new CardData();
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
      const card = new CardData();
      card.title = 'Test Title';
      card.text = 'Test Text';
      card.price = '-100';
      card.addedat = new Date(new Date().getFullYear() + 100, 1, 1);
      card.rating = 3;
      card.imageUrl = 'http://example.com/image.png';
      card.flipimg = false;
      expect(validator.isValid(card)).toBe(false);
      expect(validator.errors).toEqual({
        addedat: CardValidator.ERRORS.ADDED_AT_FUTURE,
        price: CardValidator.ERRORS.PRICE_VALID,
        grayscale: CardValidator.ERRORS.GRAYSCALE_REQUIRED,
      });
    });
  });
});
