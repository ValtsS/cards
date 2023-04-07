import { act, render, screen } from '@testing-library/react';
import React, { useEffect, useState } from 'react';
import { MockGqlApi } from '../../../__mocks__/mock-gql-api';
import * as Schema from '../../__generated__/graphql';
import { AppContextProvider } from '../app-context-provider';
import { NotificationsProvider } from '../notifications-provider';
import { MemoryStorage } from '../storage';
import { CardsApiProvider, useCardsApiContext } from './api-provider';
import { CardData, CardProviderStore } from './card-provider';
import { cardTestData2 } from './card-test-data';

const CardApiTester = () => {
  const { state, loadCards, getSingleCard } = useCardsApiContext();

  const [single, setSingle] = useState<CardData | null | undefined>();

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

  it('Should not crash', async () => {
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
});

function renderDefault(api: MockGqlApi) {
  render(
    <NotificationsProvider>
      <AppContextProvider
        localStoreProvider={new MemoryStorage()}
        formCardProvider={new CardProviderStore()}
        apolloClient={api.clientMock}
      >
        <CardsApiProvider>
          <CardApiTester />
        </CardsApiProvider>
      </AppContextProvider>
    </NotificationsProvider>
  );
}
