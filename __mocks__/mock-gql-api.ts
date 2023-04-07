import { ApolloClient, ApolloQueryResult, NetworkStatus, QueryOptions } from '@apollo/client';

jest.mock('@apollo/client', () => {
  const original = jest.requireActual('@apollo/client');
  const partialMocked = Object.keys(original).reduce((pre, methodName) => {
    // @ts-ignore
    pre[methodName] = jest.fn();
    return pre;
  }, {});
  return {
    ...partialMocked,
    gql: original.gql,
  };
});

interface MockQueryConfig<TData> {
  when: (options: QueryOptions) => boolean;
  data: TData;
}

export class MockGqlApi {
  public clientMock: jest.Mocked<ApolloClient<unknown>>;
  private queries: MockQueryConfig<unknown>[] = [];

  constructor() {
    // @ts-ignore
    this.clientMock = new ApolloClient();
    this.clientMock.query = jest
      .fn()
      .mockImplementation(() => console.error('no configured queries'));
    this.clientMock.watchQuery = jest
      .fn()
      .mockImplementation(() => console.error('no configured queries'));
    this.clientMock.mutate = jest
      .fn()
      .mockImplementation(() => console.error('no configured mutations'));
  }

  configureQuery<TData>(config: MockQueryConfig<TData>) {
    this.queries.unshift(config);

    this.clientMock.query.mockImplementation((options) => {
      const match = this.queries.find((q) => q.when(options as QueryOptions));

      if (match !== undefined) {
        return Promise.resolve({
          loading: false,
          networkStatus: NetworkStatus.ready,
          data: match.data,
        });
      }

      console.error('configured query not found');
      return Promise.resolve({} as ApolloQueryResult<any>);
    });
  }
}
