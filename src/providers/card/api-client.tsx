import { ApolloClient } from '@apollo/client';
import * as Schema from '@/__generated__/graphql';
import { CardData } from './card-provider';

export function assignCardData(target: CardData, source: Schema.Card): void {
  target.addedat = source.addedat;
  target.flipimg = source.flipimg;
  target.grayscale = source.grayscale;
  target.imageUrl = source.imageUrl;
  target.minipic = source.minipic;
  target.price = source.price?.toString() ?? undefined;
  target.rating = source.rating ?? undefined;
  target.text = source.text;
  target.title = source.title;
  target.uuid = source.uuid;
}

export interface ResultsInfo {
  totalcount: number;
  pageInfo?: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const getCards = async (
  client: ApolloClient<unknown>,
  params: Schema.CardFilterInput,
  limit: number,
  offset: number,
  order: Schema.CardSortInput[] = []
): Promise<{ cards: CardData[]; info: ResultsInfo }> => {
  const response = await client.query<Schema.GetCardsQuery>({
    query: Schema.GetCardsDocument,
    variables: {
      skip: offset,
      take: limit,
      filter: params,
      order: order,
    },
  });

  const data = response.data.getCards?.items as Schema.Card[];
  const patched: CardData[] = [];
  if (data)
    data.forEach((e) => {
      const { addedat, ...otherProps } = e;
      const c = new CardData();
      assignCardData(c, otherProps);
      c.addedat = new Date(addedat);
      patched.push(c);
    });

  const info: ResultsInfo = {
    totalcount: response.data.getCards?.totalCount ?? 0,
    pageInfo: response.data.getCards?.pageInfo,
  };

  return { cards: patched, info };
};

export const getCard = async (
  client: ApolloClient<unknown>,
  params: Schema.CardFilterInput
): Promise<CardData | null> => {
  const response = await client.query<Schema.GetCardQuery>({
    query: Schema.GetCardDocument,
    variables: {
      filter: params,
    },
  });

  const data = response.data.getCards?.items as Schema.Card[];
  const patched: CardData[] = [];

  if (data)
    data.forEach((e) => {
      const { addedat, ...otherProps } = e;
      const c = new CardData();
      assignCardData(c, otherProps);
      c.addedat = new Date(addedat);
      patched.push(c);
    });

  return patched.length > 0 ? patched[0] : null;
};
