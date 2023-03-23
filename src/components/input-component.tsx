import React, { ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import Decorator from './input-decorator';


interface InputProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  title: string;
  type: string;
  errormessage?: string;
}

export const InputWithDecorator = forwardRef(
  (props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { name, title, type, errormessage } = props;
    return (
      <Decorator name={name} title={title} errormessage={errormessage}>
        <input {...props} type={type} name={name} ref={ref} />
      </Decorator>
    );
  }
);
