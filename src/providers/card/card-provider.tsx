export enum StoreStatus {
  Pending = 'pending',
  Done = 'done',
  Error = 'error',
}

export class CardData {
  static counter = 0;
  uuid: string;
  title?: string;
  imageUrl?: string;
  text?: string;
  price?: string;
  addedat?: Date;
  minipic?: string;
  rating?: number;
  flipimg?: boolean;
  grayscale?: boolean;

  static getNext(): number {
    return CardData.counter++;
  }

  constructor() {
    this.uuid = CardData.getNext().toString();
  }
}

export class CardProviderStore {
  storeStatus: StoreStatus;
  data: CardData[] = [];

  constructor() {
    this.storeStatus = StoreStatus.Done;
  }

  insert = (card: CardData): CardData[] => {
    const lastcardUUID = this.data.length > 0 ? this.data[0].uuid : -1;
    if (card.uuid != lastcardUUID) this.data.unshift(card);
    return this.data;
  };
}
