import { FormContext } from '../providers/form-context-provider';
import React from 'react';
import './input-decorator.css';

interface Props {
  title: string;
  name: string;
  children: React.ReactNode;
}

export default class InputDecorator extends React.Component<Props> {
  static contextType = FormContext;
  declare context: React.ContextType<typeof FormContext>;

  render() {
    const { title, name } = this.props;
    const errormessage = this.context.errors[name];

    return (
      <div className="input-wrapper">
        <label htmlFor={name}>{title}:</label>
        {this.props.children}
        {errormessage && (
          <>
            <br />
            <label className="validation-error">{errormessage}</label>
          </>
        )}
        <br />
      </div>
    );
  }
}
