import React from 'react';
import { render } from '@testing-library/react';
import { FloatNotification } from './float-notification';

describe('FloatNotification', () => {
  it('renders correctly with error message', () => {
    const errorMessage = 'This is an error message';
    const { getByText } = render(<FloatNotification message={errorMessage} error />);

    const errorFloater = getByText(errorMessage);
    expect(errorFloater).toBeInTheDocument();
    expect(errorFloater).toHaveClass('errorfloater');
  });

  it('renders correctly with info message', () => {
    const infoMessage = 'This is an info message';
    const { getByText } = render(<FloatNotification message={infoMessage} />);

    const infoFloater = getByText(infoMessage);
    expect(infoFloater).toBeInTheDocument();
    expect(infoFloater).toHaveClass('infofloater');
  });

  it('renders nothing when no message is provided', () => {
    const { container } = render(<FloatNotification />);

    expect(container.firstChild).toBeNull();
  });
});
