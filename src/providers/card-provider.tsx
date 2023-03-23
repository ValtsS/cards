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
  rating?: number;
  flipimg?: boolean;
  grayscale?: boolean;
  rawImage?: File;
}

export class CardProviderStore {
  storeStatus: StoreStatus;
  data?: CardData[];

  constructor() {
    this.storeStatus = StoreStatus.Done;
  }

  load = async (filter: string): Promise<CardData[]> => {
    filter ??= '';
    this.storeStatus = StoreStatus.Pending;

    const dummypics: string[] = [
      'https://randomwordgenerator.com/img/picture-generator/54e3d3474c5aa514f1dc8460962e33791c3ad6e04e507440772d73d79749c7_640.jpg',
      'https://randomwordgenerator.com/img/picture-generator/55e8d3454d51b10ff3d8992cc12c30771037dbf85254794e722a73d4944b_640.jpg',
      'https://randomwordgenerator.com/img/picture-generator/giraffe-3351363_640.jpg',
      'https://randomwordgenerator.com/img/picture-generator/53e7d24b4d55ab14f1dc8460962e33791c3ad6e04e5077497c2a7ddd9e4dcd_640.jpg',
      'https://randomwordgenerator.com/img/picture-generator/57e1d24b4352a914f1dc8460962e33791c3ad6e04e507440752f78d09445c6_640.jpg',
    ];

    const minipic: string[] = [
      'https://randompicturegenerator.com/img/cat-generator/g0f94542dc316be8269f644259b2c33352d35679ae6abdefb768f6dc1e5ca62034d4dab3a649ebf74bd6997fd4fa16fa4_640.jpg',
      'https://randompicturegenerator.com/img/cat-generator/gbc0167b5494b0f694cef1a200e0c580556048963590ce82c252451d73dfcdd9ed9ff28282a16b8f901f409deaa7a54e8_640.jpg',
      'https://randompicturegenerator.com/img/cat-generator/ge9db644b010d046c9a4c2f01e132948959134b9b409680e72b3d758f7da3f8667c637f23a3e8984870b2aeb982859983_640.jpg',
      'https://randompicturegenerator.com/img/cat-generator/g5d735248ebee4eacce077a3a5d0c832a7b306cb0edc1c28944edc9b44caea6e794b0b0ba00bbb22c55f24e819bb4ae12_640.jpg',
    ];

    this.data = [];

    for (let i = 0; i < cardTestData.length; i++) {
      const e = cardTestData[i];

      if (
        e.price?.includes(filter) ||
        e.text?.includes(filter) ||
        e.title?.includes(filter) ||
        e.addedat?.toDateString().includes(filter)
      ) {
        if (e.rawImage) e.imageUrl = URL.createObjectURL(e.rawImage);
        else e.imageUrl = dummypics[i % dummypics.length];

        e.minipic = minipic[i % minipic.length];
        e.rating = (13 + i) % 5;
        e.flipimg = i % 2 == 0;
        e.grayscale = i % 3 == 0;
        this.data.push(e);
      }
    }

    this.storeStatus = StoreStatus.Done;
    return this.data;
  };
}
