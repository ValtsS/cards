import { act, render, screen } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { MockGqlApi } from '../../../__mocks__/mock-gql-api';
import * as Schema from '../../__generated__/graphql';
import { AppContextProvider } from '../app-context-provider';
import { NotificationsProvider, useNotifications } from '../notifications-provider';
import { MemoryStorage } from '../storage';
import { CardsApiProvider, useCardsApiContext } from './api-provider';
import { CardData, CardProviderStore } from './card-provider';
import { cardTestData2 } from './card-test-data';

const CardApiTester = () => {
  const { state, loadCards, getSingleCard } = useCardsApiContext();

  const [single, setSingle] = useState<CardData | null | undefined>();

  const { state: msg } = useNotifications();

  useEffect(() => {
    loadCards('123');
    const promise = getSingleCard('321');
    promise
      .then((value) => {
        setSingle(value);
      })
      .catch(() => setSingle(null));
  }, [getSingleCard, loadCards]);

  const ids: string[] = [];

  state.cards.forEach((e) => {
    ids.push('multiuuid:' + e.uuid);
  });

  return (
    <>
      <p>Loaded</p>
      <p>{'Length:' + state.cards.length}</p>
      <p>{'singleuuid:' + single?.uuid}</p>
      {ids.map((e) => (
        <p key={e}>{e}</p>
      ))}
      <p>{'Message=' + msg.message}</p>
      <p>{'Error=' + msg.error}</p>
    </>
  );
};

describe('API provider tests', () => {
  const twoCards: Schema.GetCardsCollectionSegment = {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
    totalCount: 2,
    items: cardTestData2,
  };

  const singleCard: Schema.GetCardsCollectionSegment = {
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
    },
    totalCount: 1,
    items: [cardTestData2[0]],
  };

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

  it('Should return single and multi search', async () => {
    act(() => renderDefault(api));

    // wait for the component to re-render
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Loaded')).toBeInTheDocument();
    expect(screen.getByText('Length:' + cardTestData2.length)).toBeInTheDocument();

    expect(screen.getByText('singleuuid:' + cardTestData2[0].uuid)).toBeInTheDocument();

    cardTestData2.forEach((e) => {
      expect(screen.getByText('multiuuid:' + e.uuid)).toBeInTheDocument();
    });
  });

  it('Should handle API errors', async () => {
    const testErr = 'Simulated API error';

    api.clientMock.query = jest.fn().mockImplementation(() => {
      throw new Error(testErr);
    });
    act(() => renderDefault(api));

    // wait for the component to re-render
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Loaded')).toBeInTheDocument();
    expect(screen.getByText('Length:0')).toBeInTheDocument();

    expect(screen.getByText('singleuuid:undefined')).toBeInTheDocument();

    expect(screen.getByText('Message=' + testErr)).toBeInTheDocument();
    expect(screen.getByText('Error=true')).toBeInTheDocument();
  });

  it('Should should trigger errors without provider', async () => {
    act(() => renderDefault(null));

    // wait for the component to re-render
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Message=client is not set')).toBeInTheDocument();
    expect(screen.getByText('Error=true')).toBeInTheDocument();
  });
});

function renderDefault(api: MockGqlApi | null) {
  render(
    <NotificationsProvider>
      <AppContextProvider
        localStoreProvider={new MemoryStorage()}
        formCardProvider={new CardProviderStore()}
        apolloClient={api?.clientMock || null}
      >
        <CardsApiProvider>
          <CardApiTester />
        </CardsApiProvider>
      </AppContextProvider>
    </NotificationsProvider>
  );
}
