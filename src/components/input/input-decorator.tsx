import React from 'react';
import { useFormContext } from 'react-hook-form';
import './input-decorator.css';

interface Props {
  title: string;
  name: string;
  children: React.ReactNode;
}

export const InputDecorator = (props: Props) => {
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
