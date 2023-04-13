import { MockGqlApi } from '@/../__mocks__/mock-gql-api';
import { renderWithProviders } from '@/../__mocks__/test-utils';
import { AppContextProvider } from '@/providers';
import { setupDefaultAPI } from '@/providers/card/api-test-helper';
import { cardTestData2 } from '@/providers/card/card-test-data';
import { setupStore } from '@/store';
import { act, screen } from '@testing-library/react';
import React from 'react';
import { LoadSingleCard } from './load-single-card';

describe('Load Single card component', () => {
  it('should not crash and load a card', async () => {
    const api = new MockGqlApi();

    setupDefaultAPI(api);

    const store = setupStore();

    act(() =>
      renderWithProviders(
        <AppContextProvider apolloClient={api.clientMock}>
          <LoadSingleCard uuid={'512'} />
        </AppContextProvider>,
        { store }
      )
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const card = cardTestData2[0];

    expect(screen.getByText(card.title ?? '')).toBeInTheDocument();
    expect(screen.getByText(card.text ?? '')).toBeInTheDocument();
    const price = card.price ? '$' + card.price : '';
    expect(screen.getByText(price)).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBe(2);
  });
});
