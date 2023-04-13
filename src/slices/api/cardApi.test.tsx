import * as Schema from '@/__generated__/graphql';
import { setupStore } from '@/store';
import { fetchCard } from './cardApi';
import { MockGqlApi } from '@/../__mocks__/mock-gql-api';
import { setupDefaultAPI } from '@/providers/card/api-test-helper';
import { cardTestData2B } from '@/providers/card/card-test-data';

describe('cardApi tests', () => {
  const api = new MockGqlApi();

  beforeAll(() => {
    setupDefaultAPI(api);
  });

  it('should query a card', async () => {
    const store = setupStore();

    const params: Schema.CardFilterInput = {
      searchQuery: '',
      uuid: '',
    };

    await store.dispatch(
      fetchCard({
        client: api.clientMock,
        params,
      })
    );

    const updatedState = store.getState();
    const data = updatedState.cardAPI.card;
    expect(data).toEqual(cardTestData2B[0]);
  });
});
