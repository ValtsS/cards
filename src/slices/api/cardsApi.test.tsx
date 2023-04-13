import * as Schema from '@/__generated__/graphql';
import { setupStore } from '@/store';
import { MockGqlApi } from '@/../__mocks__/mock-gql-api';
import { setupDefaultAPI } from '@/providers/card/api-test-helper';
import { cardTestData2B } from '@/providers/card/card-test-data';
import { fetchCards, fetchParams } from './cardsApi';

describe('cards Api tests', () => {
  const api = new MockGqlApi();

  beforeAll(() => {
    setupDefaultAPI(api);
  });

  it('should query multiple cards', async () => {
    const store = setupStore();

    const qparams: Schema.CardFilterInput = {
      searchQuery: '',
      uuid: '',
    };

    const params: fetchParams = {
      client: api.clientMock,
      limit: 100,
      offset: 0,
      order: [],
      params: qparams,
    };

    await store.dispatch(fetchCards(params));

    const updatedState = store.getState();
    const data = updatedState.cardsAPI.cards;
    expect(data).toEqual(cardTestData2B);
  });
});
