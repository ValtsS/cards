import { MockGqlApi } from '../../../__mocks__/mock-gql-api';
import * as Schema from '../../__generated__/graphql';
import { cardTestData2 } from './card-test-data';

describe('API provider tests', () => {
  const dummyCards: Schema.GetCardsCollectionSegment = {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
    totalCount: 2,
    items: cardTestData2,
  };

  const api = new MockGqlApi();

  beforeAll(() => {
    api.configureQuery<Schema.GetCardsQuery>({
      when: (options) => options.query === Schema.GetCardsDocument,
      data: {
        getCards: dummyCards,
      },
    });
  });

  it('A', async () => {});
});
