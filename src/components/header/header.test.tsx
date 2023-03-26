import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './header';

describe('Header', () => {
  it('renders the company name', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header fancyName={'CompanyName'} />
      </MemoryRouter>
    );

    const companyNameElement = screen.getByText('CompanyName');
    expect(companyNameElement).toBeInTheDocument();

    const mainLinkElement = screen.getByText('Main');
    expect(mainLinkElement).toHaveAttribute('href', '/');

    const aboutLinkElement = screen.getByText('About us');
    expect(aboutLinkElement).toHaveAttribute('href', '/about');
  });
});
