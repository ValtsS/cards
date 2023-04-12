import { renderWithProviders } from '@/../__mocks__/test-utils';
import {
  expectedTestCardData,
  fillTheInputs,
} from '@/components/card-creator/cart-creator-test-helper';
import { AppContextProvider } from '@/providers';
import { mockCardTestData } from '@/providers/card/card-test-data';
import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { ConfirmationMessage, FormerPage } from './former-page';

describe('Former page component', () => {
  it('should render without crash', async () => {
    const firstCard = mockCardTestData[0];
    firstCard.addedat = new Date('2024-06-11').getDate();

    renderWithProviders(
      <AppContextProvider apolloClient={null}>
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

  it('should should create a card', async () => {
    const mockCreateObjectURL = jest.fn(() => 'mock-url');
    const original = global.URL.createObjectURL;
    try {
      global.URL.createObjectURL = mockCreateObjectURL;

      renderWithProviders(
        <AppContextProvider apolloClient={null}>
          <FormerPage />
        </AppContextProvider>
      );

      const file = new File(['test image'], 'test.png', { type: 'image/png' });
      await fillTheInputs(expectedTestCardData, file);
      const submit = screen.getByRole('button');
      expect(submit).toBeInTheDocument();

      await act(async () => {
        fireEvent.mouseDown(submit);
        fireEvent.click(submit);
        fireEvent.mouseUp(submit);
        await new Promise((resolve) => setTimeout(resolve, 0));
      });

      expect(screen.getByText(/^Card \(Id = .+\) has been saved$/)).toBeInTheDocument();
    } finally {
      global.URL.createObjectURL = original;
    }
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
