import { MockGqlApi } from '@/../__mocks__/mock-gql-api';
import { renderWithProviders, waitRender } from '@/../__mocks__/test-utils';
import { AppContextProvider } from '@/providers';
import { setupStore } from '@/store';
import { act } from '@testing-library/react';
import React from 'react';
import { CardShellLoader } from './card-shell-loader';
import { setupDefaultAPI } from '@/providers/card/api-test-helper';

describe('CardShellLoader component', () => {
  const api = new MockGqlApi();
  const errorText = 'API Error';

  beforeEach(() => {
    setupDefaultAPI(api);
  });

  it('should handle API errors with N failures', async () => {
    const store = setupStore();
    api.clientMock.query = jest.fn();

    const initial = store.getState();
    const preload = {
      ...initial,
      cardsAPI: {
        ...initial.cardsAPI,
        errorcounter: 15,
      },
    };

    act(() => {
      renderWithProviders(
        <AppContextProvider apolloClient={api.clientMock}>
          <CardShellLoader query="test" />
        </AppContextProvider>,
        { store, preloadedState: preload }
      );
    });
    await waitRender();

    const state = store.getState();

    expect(state.notifications.error).toBe(true);
    expect(state.notifications.queue).toContainEqual({
      error: true,
      message: 'giving up due to multiple API server errors :-( Is server down?',
    });
  });

  it('should handle other failures', async () => {
    api.clientMock.query = jest.fn().mockImplementation(() => {
      throw new Error(errorText);
    });

    const store = setupStore();
    act(() => {
      renderWithProviders(
        <AppContextProvider apolloClient={api.clientMock}>
          <CardShellLoader query="test" />
        </AppContextProvider>,
        { store }
      );
    });
    await waitRender();
    const state = store.getState();
    expect(state.notifications.error).toBe(true);
    expect(state.notifications.message).toBe('Error caught while loading card: ' + errorText);
  });
});
