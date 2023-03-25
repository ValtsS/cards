import { render, screen } from '@testing-library/react';
import React from 'react';
import FormerPage from './former-page';

describe('Former page component', () => {
  it('should render without crash', async () => {
    render(<FormerPage />);
    const submit = screen.getByRole('button');
    expect(submit).toBeInTheDocument();
  });
});
