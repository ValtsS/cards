import { MockGqlApi } from '@/../__mocks__/mock-gql-api';
import { renderWithProviders, waitRender } from '@/../__mocks__/test-utils';
import { AppContextProvider } from '@/providers';
import { setupPagedDefaultAPI } from '@/providers/card/api-test-helper';
import { cardTestData2, mockCardTestData } from '@/providers/card/card-test-data';
import { setupStore } from '@/store';
import { act, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { CardShellLoader } from './card-shell-loader';

describe('CardShellLoader component', () => {
  const api = new MockGqlApi();

  beforeEach(() => {
    setupPagedDefaultAPI(api);
  });

  it('should return the data', async () => {
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

    cardTestData2.forEach((card) => {
      expect(screen.getByText(card.title ?? '')).toBeInTheDocument();
      const price = card.price ? '$' + card.price : '';
      expect(screen.getByText(price)).toBeInTheDocument();
    });

    expect(screen.queryAllByRole('img').length).toBe(mockCardTestData.length * 2);
  });

  it('should trigger the sorting', async () => {
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

    const buttonSort = screen.getAllByRole('button')[0];
    expect(buttonSort).toBeInTheDocument();

    const buttonPrev = screen.getAllByRole('button')[1];
    expect(buttonPrev).toBeInTheDocument();

    const buttonNext = screen.getAllByRole('button')[2];
    expect(buttonNext).toBeInTheDocument();

    expect(api.clientMock.query).toBeCalledTimes(1);

    expect(api.clientMock.query).lastCalledWith(
      expect.objectContaining({
        variables: {
          filter: {
            searchQuery: 'test',
            uuid: '',
          },
          order: [],
          skip: 0,
          take: 25,
        },
      })
    );

    act(() => {
      fireEvent.click(buttonSort);
    });
    await waitRender();

    expect(api.clientMock.query).toBeCalledTimes(2);

    expect(api.clientMock.query).lastCalledWith(
      expect.objectContaining({
        variables: {
          filter: {
            searchQuery: 'test',
            uuid: '',
          },
          order: [{ price: 'ASC' }],
          skip: 0,
          take: 25,
        },
      })
    );

    act(() => {
      fireEvent.click(buttonSort);
    });
    await waitRender();

    expect(api.clientMock.query).toBeCalledTimes(3);

    expect(api.clientMock.query).lastCalledWith(
      expect.objectContaining({
        variables: {
          filter: {
            searchQuery: 'test',
            uuid: '',
          },
          order: [{ price: 'DESC' }],
          skip: 0,
          take: 25,
        },
      })
    );

    act(() => {
      fireEvent.click(buttonNext);
    });
    await waitRender();

    expect(api.clientMock.query).toBeCalledTimes(4);

    expect(api.clientMock.query).lastCalledWith(
      expect.objectContaining({
        variables: {
          filter: {
            searchQuery: 'test',
            uuid: '',
          },
          order: [{ price: 'DESC' }],
          skip: 25,
          take: 25,
        },
      })
    );

    act(() => {
      fireEvent.click(buttonPrev);
    });
    await waitRender();

    expect(api.clientMock.query).toBeCalledTimes(5);

    expect(api.clientMock.query).lastCalledWith(
      expect.objectContaining({
        variables: {
          filter: {
            searchQuery: 'test',
            uuid: '',
          },
          order: [{ price: 'DESC' }],
          skip: 0,
          take: 25,
        },
      })
    );
  });
});
