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
        <label>
          {title}
          {this.props.children}
        </label>
        {errormessage && (
          <>
            <br />
            <div className="validation-error">{errormessage}</div>
          </>
        )}
        <br />
      </div>
    );
  }
}
