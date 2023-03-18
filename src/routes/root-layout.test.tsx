import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RootLayout } from './root-layout';

describe('RootLayout', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <RootLayout>
          <p>Test</p>
        </RootLayout>
      </MemoryRouter>
    );
  });

  test('displays the current path', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <RootLayout>
          <p>Test</p>
        </RootLayout>
      </MemoryRouter>
    );

    expect(getByText('/about')).toBeInTheDocument();
  });

  test('displays navigation links', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <RootLayout>
          <p>Test</p>
        </RootLayout>
      </MemoryRouter>
    );

    expect(getByText('Main')).toBeInTheDocument();
    expect(getByText('About us')).toBeInTheDocument();
  });

  test('displays child components', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <RootLayout>
          <p>Test</p>
        </RootLayout>
      </MemoryRouter>
    );

    expect(getByText('Test')).toBeInTheDocument();
  });
});