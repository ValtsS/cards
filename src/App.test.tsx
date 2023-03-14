import { getByText, render } from '@testing-library/react';
import App from 'App';
import React from 'react';

describe('App component', () => {
  it('should render without crash', () => {
    render(<App />);
  });

  it('should catch and handle errors', () => {

    render(<App throwError={true} />);

    //expect(getByText('Seems like we have an error!')).toBeInTheDocument();

  });

});
