import { CardData } from '../providers/card-provider';
import Refs from './card-creator-refs';

export interface CardErrors {
  [key: string]: string;
}

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
      if (card.addedat > new Date()) this.errors['addedat'] = CardValidator.ERRORS.ADDED_AT_FUTURE;
    }

    if (!card.rating || card.rating < 1)
      this.errors['rating'] = CardValidator.ERRORS.RATING_REQUIRED;

    if (!card.imageUrl) this.errors['bigimagemage'] = CardValidator.ERRORS.IMAGE_REQUIRED;

    if (typeof card.flipimg === 'undefined')
      this.errors['radioflip'] = CardValidator.ERRORS.ORIENTATION_REQUIRED;

    return Object.keys(this.errors).length === 0;
  }

  prepareCard(R: Refs): CardData {
    const parsed = Date.parse(R.refAdded.current?.value ?? '');

    const c = new CardData();
    c.title = R.refTitle.current?.value;
    c.text = R.refText.current?.value;
    c.price = R.refPrice.current?.value;
    c.addedat = isNaN(parsed) === false ? new Date(parsed) : undefined;
    c.rating = +(R.refSelect.current?.value ?? 0);
    c.grayscale = R.refGray.current?.checked;
    c.imageUrl = R.formImageURL(true);

    const selected = R.refRadios.selectedIndex();

    switch (selected) {
      case 0:
        c.flipimg = false;
        break;
      case 1:
        c.flipimg = true;
        break;
      default:
        c.flipimg = undefined;
    }

    return c;
  }
}
