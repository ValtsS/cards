import { FormContext } from '@/providers';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import './input-decorator.css';

interface Props {
  title: string;
  name: string;
  children: React.ReactNode;
}

export const InputDecorator2 = (props: Props) => {
  const { formState } = useFormContext();

  const { title, name } = props;
  const errormessage = formState.errors[name];

  return (
    <div className="input-wrapper">
      <label>
        {title}
        {props.children}
      </label>
      {errormessage && (
        <>
          <br />
          <div className="validation-error">{errormessage.message as string}</div>
        </>
      )}
      <br />
    </div>
  );
};

export class InputDecorator extends React.Component<Props> {
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
