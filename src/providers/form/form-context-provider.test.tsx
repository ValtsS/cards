import { CardErrors } from '@/components/card-creator/card-validator';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormContext, FormContextProvider, useFormContext } from './form-context-provider';

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
});

const ChildComponent = () => {
  const {errors} = useFormContext();
  return <p>{errors['title']}</p>;

}
