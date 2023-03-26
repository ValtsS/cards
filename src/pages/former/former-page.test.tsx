import { render, screen } from '@testing-library/react';
import { AppContextProvider } from 'providers/app-context-provider';
import { CardProviderStore } from 'providers/card-provider';
import { cardTestData } from 'providers/card-test-data';
import { MemoryStorage } from 'providers/memory-storage';
import React from 'react';
import { ConfirmationMessage, FormerPage } from './former-page';

describe('Former page component', () => {
  it('should render without crash', async () => {
    const testCardProvider = new CardProviderStore();
    const firstCard = cardTestData[0];

    testCardProvider.data.push(firstCard);

    render(
      <AppContextProvider
        localStoreProvider={new MemoryStorage()}
        cardProvider={new CardProviderStore()}
        formCardProvider={testCardProvider}
      >
        <FormerPage />
      </AppContextProvider>
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
