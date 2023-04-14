import { CardErrors } from '@/components/card-creator/card-validator';
import { render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import { FormContextProvider, useFormContext } from './form-context-provider';

describe('FormContextProvider', () => {
  it('provides errors to the child components', () => {
    const errors: CardErrors = {
      title: 'Title is required',
    };

    render(
      <FormContextProvider errors={errors}>
        <ChildComponent />
      </FormContextProvider>
    );

    expect(screen.getByText(errors['title'])).toBeInTheDocument();
  });

  test('should throw an error when used outside of FormContextProvider', () => {
    const original = React.useContext;
    const spiedOnError = jest.spyOn(console, 'error').mockImplementation(() => {});
    try {
      React.useContext = jest.fn().mockReturnValueOnce(null);
      expect(spiedOnError).toHaveBeenCalledTimes(0);
      expect(() => {
        renderHook(() => useFormContext());
      }).toThrowError();
      expect(spiedOnError).toHaveBeenCalled();
    } finally {
      React.useContext = original;
      spiedOnError.mockRestore();
    }
  });
});

const ChildComponent = () => {
  const { errors } = useFormContext();
  return <p>{errors['title']}</p>;
};
