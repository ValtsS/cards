import * as Schema from '@/__generated__/graphql';
import { MockGqlApi } from '../../../__mocks__/mock-gql-api';
import { pagedTwoCards, singleCard, twoCards } from './card-test-data';

export function setupDefaultAPI(api: MockGqlApi) {
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
}

export function setupPagedDefaultAPI(api: MockGqlApi) {
  api.configureQuery<Schema.GetCardsQuery>({
    when: (options) => options.query === Schema.GetCardsDocument,
    data: {
      getCards: pagedTwoCards,
    },
  });

  api.configureQuery<Schema.GetCardQuery>({
    when: (options) => options.query === Schema.GetCardDocument,
    data: {
      getCards: singleCard,
    },
  });
}
