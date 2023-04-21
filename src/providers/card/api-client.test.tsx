import * as Schema from '@/__generated__/graphql';
import { MockGqlApi } from '@/../__mocks__/mock-gql-api';
import { getCard, getCards } from './api-client';
import { setupDefaultAPI } from './api-test-helper';
import { cardTestData2B } from '@/../__mocks__/card-test-data';

describe('Client tests', () => {
  const api = new MockGqlApi();

  beforeAll(() => {
    setupDefaultAPI(api);
  });

  it('getCards should work', async () => {
    const params: Schema.CardFilterInput = {
      searchQuery: '',
      uuid: '',
    };

    const data = await getCards(api.clientMock, params, 99, 0);
    expect(data).toEqual({
      cards: cardTestData2B,
      info: { totalcount: 2, pageInfo: { hasNextPage: false, hasPreviousPage: false } },
    });
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
    expect(JSON.stringify(data)).toMatch(JSON.stringify({ cards: [], info: { totalcount: 0 } }));
  });

  it('getCard should work', async () => {
    const params: Schema.CardFilterInput = {
      searchQuery: '',
      uuid: '',
    };

    const data = await getCard(api.clientMock, params);
    expect(data).toEqual(cardTestData2B[0]);
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
