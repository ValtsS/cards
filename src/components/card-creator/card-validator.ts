import { CardData, Cards } from '@/providers';
import { Message } from 'react-hook-form';
import ImageCache from '@/core/ImageCache';

export interface CardErrors {
  [key: string]: string;
}

export type CardFormValues = {
  title: string;
  text: string;
  price: number;
  addedat: string;
  rating: string;
  grayscale: boolean;
  bigimagemage: FileList;
  radioflip: string;
};

export class CardValidator {
  errors: CardErrors = {};

  static ERRORS = {
    TITLE_REQUIRED: 'Title is required',
    TEXT_REQUIRED: 'Text is required',
    PRICE_REQUIRED: 'Price is required',
    PRICE_VALID: 'Price has to be valid (positive)',
    ADDED_AT_REQUIRED: 'Added at is required',
    ADDED_AT_FUTURE: 'Added at cannot be in the future!',
    RATING_REQUIRED: 'At least one star rating is required',
    IMAGE_REQUIRED: 'Please provide a pretty picture',
    ORIENTATION_REQUIRED: 'Need to pick orientation',
    GRAYSCALE_REQUIRED: 'Need to agree to have grayscale set',
  };

  static IMAGE_ORIENTATION = {
    NORMAL: 'Normal',
    FLIPPED: 'Flipped',
  };

  onPriceValidate = (value: number): Message | boolean => {
    if (!value) return CardValidator.ERRORS.PRICE_REQUIRED;
    if (+value <= 0) return CardValidator.ERRORS.PRICE_VALID;

    return true;
  };

  onDateValidate = (value: string): Message | boolean => {
    if (!value) return CardValidator.ERRORS.ADDED_AT_REQUIRED;
    const raw = Date.parse(value);
    if (isNaN(raw)) return CardValidator.ERRORS.ADDED_AT_REQUIRED;
    if (new Date(raw) > new Date()) return CardValidator.ERRORS.ADDED_AT_FUTURE;
    return true;
  };

  onRatingValidate = (value: string): Message | boolean => {
    const rating = +value;
    if (!rating || rating < 1) return CardValidator.ERRORS.RATING_REQUIRED;

    return true;
  };

  onFlipValidate = (value: string): Message | boolean => {
    if (!value) return CardValidator.ERRORS.ORIENTATION_REQUIRED;

    if (
      value != CardValidator.IMAGE_ORIENTATION.NORMAL &&
      value != CardValidator.IMAGE_ORIENTATION.FLIPPED
    )
      return CardValidator.ERRORS.ORIENTATION_REQUIRED;

    return true;
  };

  isFileValid = (file: File) => {
    return file && file.type.startsWith('image/');
  };

  onImageValidate = (value: FileList): Message | boolean => {
    if (!value || value.length < 1) return CardValidator.ERRORS.IMAGE_REQUIRED;
    const file = value[0];
    if (!this.isFileValid(file)) return CardValidator.ERRORS.IMAGE_REQUIRED;
    return true;
  };

  isValid(card: CardData): boolean {
    this.errors = {};

    if (!card.title) this.errors['title'] = CardValidator.ERRORS.TITLE_REQUIRED;
    if (!card.text) this.errors['text'] = CardValidator.ERRORS.TEXT_REQUIRED;
    if (!card.price) this.errors['price'] = CardValidator.ERRORS.PRICE_REQUIRED;
    else {
      if (+card.price <= 0) this.errors['price'] = CardValidator.ERRORS.PRICE_VALID;
    }

    if (!card.addedat) this.errors['addedat'] = CardValidator.ERRORS.ADDED_AT_REQUIRED;
    else {
      if (card.addedat > new Date().getTime())
        this.errors['addedat'] = CardValidator.ERRORS.ADDED_AT_FUTURE;
    }

    if (!card.rating || card.rating < 1)
      this.errors['rating'] = CardValidator.ERRORS.RATING_REQUIRED;

    if (!card.grayscale) this.errors['grayscale'] = CardValidator.ERRORS.GRAYSCALE_REQUIRED;

    if (!card.imageUrl) this.errors['bigimagemage'] = CardValidator.ERRORS.IMAGE_REQUIRED;

    if (typeof card.flipimg === 'undefined')
      this.errors['radioflip'] = CardValidator.ERRORS.ORIENTATION_REQUIRED;

    return Object.keys(this.errors).length === 0;
  }

  prepareCard(vals: CardFormValues, cache: ImageCache): CardData {
    const parsed = Date.parse(vals.addedat);

    const c = Cards.alloc();
    c.title = vals.title;
    c.text = vals.text;
    c.price = vals.price.toString();
    c.addedat = isNaN(parsed) === false ? new Date(parsed).getTime() : undefined;
    c.rating = +(vals.rating ? vals.rating : 0);
    c.grayscale = vals.grayscale;
    c.imageUrl = cache.formImageURL(true, vals.bigimagemage[0]);

    const selected = vals.radioflip;

    switch (selected) {
      case CardValidator.IMAGE_ORIENTATION.NORMAL:
        c.flipimg = false;
        break;
      case CardValidator.IMAGE_ORIENTATION.FLIPPED:
        c.flipimg = true;
        break;
      default:
        c.flipimg = undefined;
    }

    return c;
  }
}
