import { AppContextProvider } from '@/providers';
import { act, screen } from '@testing-library/react';
import React from 'react';

import { MockGqlApi } from '@/../__mocks__/mock-gql-api';
import { renderWithProviders } from '@/../__mocks__/test-utils';
import { setupStore } from '@/store';
import { LoadSingleCard } from './load-single-card';

describe('Load Single card component', () => {
  it('should handle error in loading', async () => {
    const api = new MockGqlApi();

    const errMsg = 'API failed';

    api.clientMock.query = jest.fn().mockImplementation(() => {
      throw new Error(errMsg);
    });

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

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    const state = store.getState();
    expect(state.notifications.error).toBe(true);
    expect(state.notifications.message).toBe('Error caught while loading card: ' + errMsg);
  });
});
