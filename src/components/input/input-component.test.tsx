import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { InputWithDecorator } from './input-component';

describe('InputWithDecorator', () => {
  it('renders an input with the correct props', () => {
    const ref = React.createRef<HTMLInputElement>();
    const props = {
      name: 'test-input',
      title: 'Test Input',
      type: 'text',
      accept: '.jpg,.png,.gif',
      placeholder: 'Enter a value',
      onChange: jest.fn(),
      ref: ref,
    };
    const { getByPlaceholderText } = render(<InputWithDecorator {...props} />);
    const input = getByPlaceholderText('Enter a value') as HTMLInputElement;
    expect(input.name).toBe('test-input');
    expect(input.title).toBe('Test Input');
    expect(input.type).toBe('text');
    expect(input.accept).toBe('.jpg,.png,.gif');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(ref.current).toBe(input);
  });
});
