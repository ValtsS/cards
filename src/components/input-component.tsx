import React, { ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import InputDecorator from './input-decorator';

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  title: string;
  type: string;
}

export const InputWithDecorator = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { name, title, type } = props;
    return (
      <InputDecorator name={name} title={title}>
        <input {...props} type={type} name={name} ref={ref} />
      </InputDecorator>
    );
  }
);
