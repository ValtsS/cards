import { MockGqlApi } from '@/../__mocks__/mock-gql-api';
import { renderWithProviders } from '@/../__mocks__/test-utils';
import { AppContextProvider } from '@/providers';
import { useNotifications } from '@/providers/notifications-provider/notifications-provider';
import { setupStore } from '@/store';
import { act, screen } from '@testing-library/react';
import React from 'react';
import { CardShellLoader } from './card-shell-loader';

describe('CardShellLoader component', () => {
  const api = new MockGqlApi();
  const errorText = 'API Error';

  beforeEach(() => {
    api.clientMock.query = jest.fn().mockImplementation(() => {
      throw new Error(errorText);
    });
  });

  it('should handle API errors with N failures', async () => {
    return;
    const store = setupStore();
    act(() => {
      renderWithProviders(
        <AppContextProvider apolloClient={api.clientMock}>
          <CardShellLoader query="test" />
        </AppContextProvider>,
        { store }
      );
    });
    const { setMessage } = useNotifications();
    expect(setMessage).toBeCalled();
    expect(setMessage).toBeCalledWith(
      'giving up due to multiple API server errors :-( Is server down?',
      true
    );
  });

  it('should handle other failures', async () => {
    return;
    const store = setupStore();
    act(() => {
      renderWithProviders(
        <AppContextProvider apolloClient={api.clientMock}>
          <CardShellLoader query="test" />
        </AppContextProvider>,
        { store }
      );
    });

    const { setMessage } = useNotifications();
    expect(setMessage).toBeCalled();
    expect(setMessage).toBeCalledWith('API call failed', true);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
