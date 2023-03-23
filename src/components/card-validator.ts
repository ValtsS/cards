import { CardData } from 'providers/card-provider';

export interface CardErrors {
  [key: string]: string;
}

function nameof<T>(name: keyof T): keyof T | undefined {
  return name;
}

export class CardValidator {

  errors: CardErrors = {};

  isValid(card: CardData): boolean {

    this.errors = {};

    if (!card.title)
      this.errors['title'] = "Title is required";



    return (Object.keys(this.errors).length === 0) ?? false;
  }
}
