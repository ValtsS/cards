import { AppContextProvider, CardProviderStore, MemoryStorage } from '@/providers';
import { mockCardTestData } from '@/providers/card/card-test-data';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ConfirmationMessage, FormerPage } from './former-page';
import { renderWithProviders } from '@/../__mocks__/test-utils';

describe('Former page component', () => {
  it('should render without crash', async () => {
    const testCardProvider = new CardProviderStore();
    const firstCard = mockCardTestData[0];

    testCardProvider.data.push(firstCard);
    firstCard.addedat = new Date('2024-06-11').getDate();

    renderWithProviders(
      <AppContextProvider localStoreProvider={new MemoryStorage()} apolloClient={null}>
        <FormerPage />
      </AppContextProvider>,
      {
        preloadedState: {
          cards: { data: [firstCard] },
        },
      }
    );
    const submit = screen.getByRole('button');
    expect(submit).toBeInTheDocument();
    expect(screen.getByText(firstCard.title ?? '')).toBeInTheDocument();
    expect(screen.getByText(firstCard.text ?? '')).toBeInTheDocument();
  });
});

describe('ConfirmationMessage', () => {
  it('renders message when provided', () => {
    const message = 'Success message';
    const { getByText } = render(<ConfirmationMessage message={message} />);
    expect(getByText(message)).toBeInTheDocument();
  });

  it('does not render message when not provided', () => {
    const { container } = render(<ConfirmationMessage />);
    expect(container.firstChild).toBeNull();
  });
});
