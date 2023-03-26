import { render, screen } from '@testing-library/react';
import React from 'react';
import { withInputDecorations, WithInputProps } from './input-hoc';

describe('withInputDecorations', () => {
  const TestComponent = ({ name, title }: WithInputProps) => {
    return <input id={name} aria-label={title} />;
  };

  const ComponentWithInputDecorations = withInputDecorations(TestComponent);

  test('renders the input with the label', () => {
    render(<ComponentWithInputDecorations name="test" title="Test" />);
    const label = screen.getByLabelText('Test:');
    expect(label).toBeInTheDocument();
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test');
  });
});
