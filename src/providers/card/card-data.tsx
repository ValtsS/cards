export type CardData = {
  uuid: string;
  title?: string;
  imageUrl?: string;
  text?: string;
  price?: string;
  addedat?: number;

  minipic?: string;
  rating?: number;
  flipimg?: boolean;
  grayscale?: boolean;
};

export class Cards {
  static counter = 0;

  static getNext(): number {
    return Cards.counter++;
  }

  static alloc = (): CardData => {
    const nc: CardData = {
      uuid: Cards.getNext().toString(),
    };
    return nc;
  };
}
