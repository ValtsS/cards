import { CardErrors } from 'components/card-validator';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormContext, FormContextProvider } from './form-context-provider';

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

export default class ChildComponent extends React.Component {
  static contextType = FormContext;
  declare context: React.ContextType<typeof FormContext>;

  render() {
    const errormessage = this.context.errors['title'];
    return <p>{errormessage}</p>;
  }
}
