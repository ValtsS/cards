import { MockGqlApi } from '@/../__mocks__/mock-gql-api';
import * as Schema from '@/__generated__/graphql';
import { setupDefaultAPI } from '@/providers/card/api-test-helper';
import { cardTestData2B } from '@/../__mocks__/card-test-data';
import { setupStore } from '@/store';
import { StoreStatus, fetchCards, fetchParams } from './cardsApi';

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
    const data = updatedState.cardsAPI;
    expect(data.status).toBe(StoreStatus.succeeded);
    expect(data.cards).toEqual(cardTestData2B);
    expect(data.errorcounter).toBe(0);
    expect(data.limit).toBe(params.limit);
    expect(data.offset).toBe(params.offset);
  });

  it('should handle errors', async () => {
    const store = setupStore();

    const errMsg = 'API failed';

    api.clientMock.query = jest.fn().mockImplementation(() => {
      throw new Error(errMsg);
    });

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

    const data = updatedState.cardsAPI;
    expect(data.status).toBe(StoreStatus.failed);
    expect(data.error).toBeTruthy();
    expect(data.cards.length).toBe(0);
    expect(data.errorcounter).toBe(1);
  });
});
