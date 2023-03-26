import { FormContext } from '@/providers';
import { render, screen } from '@testing-library/react';
import React from 'react';
import InputDecorator from './input-decorator';

describe('InputDecorator', () => {
  const title = 'Test Input';
  const name = 'test-input';
  const children = <input type="text" name={name} />;

  it('renders the title and children with no error message', () => {
    const contextValue = {
      errors: {},
    };

    render(
      <FormContext.Provider value={contextValue}>
        <InputDecorator title={title} name={name}>
          {children}
        </InputDecorator>
      </FormContext.Provider>
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.name).toBe(name);

    expect(screen.queryByText('Validation error message')).not.toBeInTheDocument();
  });

  it('renders the title, children, and error message', () => {
    const contextValue = {
      errors: {
        [name]: 'Validation error message',
      },
    };
    render(
      <FormContext.Provider value={contextValue}>
        <InputDecorator title={title} name={name}>
          {children}
        </InputDecorator>
      </FormContext.Provider>
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.name).toBe(name);

    const errorMessage = screen.getByText('Validation error message');
    expect(input.name).toBe(name);
    expect(errorMessage).toBeInTheDocument();
  });
});
