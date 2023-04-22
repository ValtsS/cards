import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { RootLayout } from './root-layout';
import { Provider } from 'react-redux';
import { setupStore } from '@/store';

describe('RootLayout', () => {
  test('renders without crashing', () => {
    renderWithPath('/');
  });

  test('displays the current path', () => {
    const { getByText } = renderWithPath('/about');

    expect(getByText('/about')).toBeInTheDocument();
  });

  test('displays navigation links', () => {
    const { getByText } = renderWithPath('/');
    expect(getByText('Main')).toBeInTheDocument();
    expect(getByText('About us')).toBeInTheDocument();
  });

  test('displays child components', () => {
    const { getByText } = renderWithPath('/');
    expect(getByText('Test')).toBeInTheDocument();
  });

  function renderWithPath(path: string) {
    const store = setupStore();
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[path]}>
          <RootLayout>
            <p>Test</p>
          </RootLayout>
        </MemoryRouter>
      </Provider>
    );
  }
});
