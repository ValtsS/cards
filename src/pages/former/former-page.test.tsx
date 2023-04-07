import { AppContextProvider, CardProviderStore, MemoryStorage } from '@/providers';
import { mockCardTestData } from '@/providers/card/card-test-data';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ConfirmationMessage, FormerPage } from './former-page';

describe('Former page component', () => {
  it('should render without crash', async () => {
    const testCardProvider = new CardProviderStore();
    const firstCard = mockCardTestData[0];

    testCardProvider.data.push(firstCard);

    render(
      <AppContextProvider
        localStoreProvider={new MemoryStorage()}
        apolloClient={null}
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
