import { FormContext } from '../providers/form-context-provider';
import React from 'react';

interface Props {
  title: string;
  name: string;
  children: React.ReactNode;
}

export default class Decorator extends React.Component<Props> {

  static contextType = FormContext;
  declare context: React.ContextType<typeof FormContext>;

  render() {
    const { title, name} = this.props;
    const errormessage = this.context.errors[name];

    return (
      <>
        <label htmlFor={name}>{title}:</label>
        {this.props.children}
        {errormessage && (
          <>
            <br />
            <label>{errormessage}</label>
          </>
        )}
        <br />
      </>
    );
  }
}
