import * as Schema from '@/__generated__/graphql';
import { MockGqlApi } from '../../../__mocks__/mock-gql-api';
import { getCard, getCards } from './api-client';
import { cardTestData2B, singleCard, twoCards } from './card-test-data';

describe('Client tests', () => {
  const api = new MockGqlApi();

  beforeAll(() => {
    api.configureQuery<Schema.GetCardsQuery>({
      when: (options) => options.query === Schema.GetCardsDocument,
      data: {
        getCards: twoCards,
      },
    });

    api.configureQuery<Schema.GetCardQuery>({
      when: (options) => options.query === Schema.GetCardDocument,
      data: {
        getCards: singleCard,
      },
    });
  });

  it('getCards should work', async () => {
    const params: Schema.CardFilterInput = {
      searchQuery: '',
      uuid: '',
    };

    const data = await getCards(api.clientMock, params, 99, 0);
    expect(JSON.stringify(data)).toMatch(JSON.stringify({ cards: cardTestData2B, totalcount: 2 }));
  });

  it('getCards should that return nothing work', async () => {
    api.configureQuery<Schema.GetCardsQuery>({
      when: (options) => options.query === Schema.GetCardsDocument,
      data: {
        getCards: undefined,
      },
    });

    const params: Schema.CardFilterInput = {
      searchQuery: '',
      uuid: '',
    };

    const data = await getCards(api.clientMock, params, 99, 0);
    expect(JSON.stringify(data)).toMatch(JSON.stringify({ cards: [], totalcount: 0 }));
  });

  it('getCard should work', async () => {
    const params: Schema.CardFilterInput = {
      searchQuery: '',
      uuid: '',
    };

    const data = await getCard(api.clientMock, params);
    expect(JSON.stringify(data)).toMatch(JSON.stringify(cardTestData2B[0]));
  });

  it('getCard should work when nothing is found', async () => {
    const params: Schema.CardFilterInput = {
      searchQuery: '',
      uuid: '',
    };

    api.configureQuery<Schema.GetCardQuery>({
      when: (options) => options.query === Schema.GetCardDocument,
      data: {
        getCards: undefined,
      },
    });

    const data = await getCard(api.clientMock, params);
    expect(data).toBe(null);
  });
});
