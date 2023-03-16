import { cardTestData } from './card-test-data';

export enum StoreStatus {
  Pending = 'pending',
  Done = 'done',
  Error = 'error',
}

export class CardData {
  title?: string;
  imageUrl?: string;
  text?: string;
  price?: string;
  addedat?: Date;
  minipic?: string;
}

export class CardProviderStore {
  storeStatus: StoreStatus;
  data?: CardData[];

  constructor() {
    this.storeStatus = StoreStatus.Done;
  }

  load = async (filter: string): Promise<CardData[]> => {
    this.storeStatus = StoreStatus.Pending;
    //Simulate delay
    console.log('Async loader Called with filter ' + filter);
    await new Promise((resolve) => setTimeout(resolve, 250));
    this.data = cardTestData;
    this.storeStatus = StoreStatus.Done;
    console.log('Load complete!');
    return this.data;
  };
}
