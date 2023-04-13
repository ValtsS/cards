import * as Schema from '@/__generated__/graphql';
import { CardData } from './card-provider';

let dummy = 999999;

export const mockCardTestData: CardData[] = [
  {
    uuid: (dummy++).toString(),
    title: 'Luxury Suite at Marriott',
    imageUrl:
      'https://randomwordgenerator.com/img/picture-generator/54e3d3474c5aa514f1dc8460962e33791c3ad6e04e507440772d73d79749c7_640.jpg',
    text: 'Experience the ultimate comfort and relaxation in our spacious luxury suite at Marriott.',
    price: '800',
    addedat: new Date('2024-06-11').getTime(),
    minipic:
      'https://randompicturegenerator.com/img/cat-generator/g0f94542dc316be8269f644259b2c33352d35679ae6abdefb768f6dc1e5ca62034d4dab3a649ebf74bd6997fd4fa16fa4_640.jpg',
  },
  {
    uuid: (dummy++).toString(),
    title: 'Standard Room at Hilton',
    imageUrl:
      'https://randomwordgenerator.com/img/picture-generator/55e8d3454d51b10ff3d8992cc12c30771037dbf85254794e722a73d4944b_640.jpg',
    text: 'Enjoy a comfortable stay in our standard room at Hilton, perfect for business or leisure.',
    price: '250',
    addedat: new Date('2024-03-05').getTime(),
    minipic:
      'https://randompicturegenerator.com/img/cat-generator/gbc0167b5494b0f694cef1a200e0c580556048963590ce82c252451d73dfcdd9ed9ff28282a16b8f901f409deaa7a54e8_640.jpg',
  },
];

export const cardTestData2: Schema.Card[] = [
  {
    flipimg: false,
    grayscale: false,
    addedat: new Date('2022-01-13'),
    imageUrl: 'Url',
    matches: true,
    minipic: 'Mini',
    price: 92456,
    rating: 3,
    text: 'text1234',
    title: 'TitelA',
    uuid: '1234',
  },
  {
    flipimg: true,
    grayscale: true,
    imageUrl: 'UrlX',
    matches: true,
    minipic: 'MiniY',
    price: 2456,
    text: 'text456',
    title: 'TitelB',
    uuid: '1235',
  },
];

const card1: CardData = {
  flipimg: false,
  grayscale: false,
  addedat: new Date('2022-01-13').getTime(),
  imageUrl: 'Url',
  minipic: 'Mini',
  price: '92456',
  rating: 3,
  text: 'text1234',
  title: 'TitelA',
  uuid: '1234',
};

const card2: CardData = {
  addedat: undefined,
  flipimg: true,
  grayscale: true,
  imageUrl: 'UrlX',
  minipic: 'MiniY',
  price: '2456',
  rating: undefined,
  text: 'text456',
  title: 'TitelB',
  uuid: '1235',
};

export const cardTestData2B: CardData[] = [card1, card2];

export const twoCards: Schema.GetCardsCollectionSegment = {
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
  },
  totalCount: 2,
  items: cardTestData2,
};

export const pagedTwoCards: Schema.GetCardsCollectionSegment = {
  pageInfo: {
    hasNextPage: true,
    hasPreviousPage: true,
  },
  totalCount: 2,
  items: cardTestData2,
};

export const singleCard: Schema.GetCardsCollectionSegment = {
  pageInfo: {
    hasNextPage: false,
    hasPreviousPage: false,
  },
  totalCount: 1,
  items: [cardTestData2[0]],
};
