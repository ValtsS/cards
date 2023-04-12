// export class CardData {
//   static counter = 0;
//   uuid: string;
//   title?: string;
//   imageUrl?: string;
//   text?: string;
//   price?: string;
//   addedat_timestamp?: number;

//   minipic?: string;
//   rating?: number;
//   flipimg?: boolean;
//   grayscale?: boolean;

//   static getNext(): number {
//     return CardData.counter++;
//   }

//   get addedat(): Date | undefined {
//     if (this.addedat_timestamp) {
//       return new Date(this.addedat_timestamp);
//     }
//     return undefined;
//   }

//   set addedat(date: Date | undefined) {
//     if (date) {
//       this.addedat_timestamp = date.getTime();
//     } else {
//       this.addedat_timestamp = undefined;
//     }
//   }

//   constructor(props?: Partial<CardData>) {
//     this.uuid = CardData.getNext().toString();
//     if (props) Object.assign(this, props);
//   }
// }

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

export class CardProviderStore {
  data: CardData[] = [];

  insert = (card: CardData): CardData[] => {
    const lastcardUUID = this.data.length > 0 ? this.data[0].uuid : -1;
    if (card.uuid != lastcardUUID) this.data.unshift(card);
    return this.data;
  };
}
