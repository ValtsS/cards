import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Overlay } from './overlay';

describe('Overlay', () => {
  const defaultProps = {
    isOpen: false,
    onClose: jest.fn(),
    children: <div>Overlay Content</div>,
  };

  test('renders overlay content when isOpen prop is true', () => {
    const { getByText } = render(<Overlay {...defaultProps} isOpen={true} />);
    expect(getByText('Overlay Content')).toBeInTheDocument();
  });

  test('does not render overlay content when isOpen prop is false', () => {
    const { queryByText } = render(<Overlay {...defaultProps} />);
    expect(queryByText('Overlay Content')).toBeNull();
  });

  test('calls onClose callback when overlay is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByTestId } = render(
      <Overlay {...defaultProps} isOpen={true} onClose={onCloseMock} />
    );

    fireEvent.click(getByTestId('overlay'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose callback when overlay content is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByTestId } = render(
      <Overlay {...defaultProps} isOpen={true} onClose={onCloseMock} />
    );

    fireEvent.click(getByTestId('overlay-content'));
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  test('calls onClose callback when close button is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(<Overlay {...defaultProps} isOpen={true} onClose={onCloseMock} />);

    fireEvent.click(getByText('×'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
