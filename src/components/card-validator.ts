import { CardData } from 'providers/card-provider';

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

    if (!card.grayscale) this.errors['grayscale'] = 'Box should be checked or unchecked!';

    return Object.keys(this.errors).length === 0 ?? false;
  }
}
