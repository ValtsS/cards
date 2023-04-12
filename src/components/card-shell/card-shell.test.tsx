import { Cards } from '@/providers';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { CardShell } from './card-shell';

const mockShowDialog = jest.fn(() => 'Mocked showDialog return value');

jest.mock('@/providers', () => {
  const mockuseModalDialog = jest.fn(() => ({
    showDialog: mockShowDialog,
  }));

  return {
    ...jest.requireActual('@/providers'),
    useModalDialog: mockuseModalDialog,
  };
});

describe('Card Shell component', () => {
  it('should not crash', () => {
    render(<CardShell data={[]} query="UUUUU" />);

    expect(screen.getByText('no cards found for your search query: UUUUU')).toBeInTheDocument();
  });
  it('should render something', () => {
    const test = Cards.alloc();
    test.title = 'Title';
    test.price = '100';
    test.text = 'Text';

    render(<CardShell data={[test]} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
    expect(screen.getByText('Text')).toBeInTheDocument();
  });

  it('renders default message when query is undefined', () => {
    const { getByText } = render(<CardShell data={[]} query={undefined} />);
    expect(getByText('no cards found for your search query:')).toBeInTheDocument();
  });

  it('should call showDialog!', () => {
    const test = Cards.alloc();
    test.title = 'Title';
    test.price = '100';
    test.text = 'Text';

    render(<CardShell data={[test]} showdetails={true} />);

    const image = screen.getByRole('img');
    fireEvent.click(image);

    expect(mockShowDialog).toBeCalled();
  });

  it('should not call showDialog!', () => {
    const test = Cards.alloc();
    test.title = 'Title';
    test.price = '100';
    test.text = 'Text';

    render(<CardShell data={[test]} />);

    const image = screen.getByRole('img');
    fireEvent.click(image);

    expect(mockShowDialog).not.toBeCalled();
  });
});
