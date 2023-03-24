import { CardData } from '../providers/card-provider';
import Refs from './card-creator-refs';

export interface CardErrors {
  [key: string]: string;
}

export class CardValidator {
  errors: CardErrors = {};

  isValid(card: CardData): boolean {
    this.errors = {};

    if (!card.title) this.errors['title'] = 'Title is required';
    if (!card.text) this.errors['text'] = 'Text is required';
    if (!card.price) this.errors['price'] = 'Price is required';
    else {
      if (+card.price <= 0) this.errors['price'] = 'Price has to be valid (positive)';
    }

    if (!card.addedat) this.errors['addedat'] = 'Added at is required';
    else {
      if (card.addedat > new Date()) this.errors['addedat'] = 'Added at cannot be in the future!';
    }

    if (!card.rating || card.rating < 1)
      this.errors['rating'] = 'At least one star rating is required';

    return Object.keys(this.errors).length === 0 ?? false;
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

    return c;
  }
}
