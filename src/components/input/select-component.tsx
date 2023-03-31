import React, { ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import { Message, useFormContext } from 'react-hook-form';
import { InputDecorator, InputDecorator2 } from './input-decorator';

interface SelectProps2 extends HTMLAttributes<HTMLSelectElement> {
  name: string;
  title: string;
  values: string[];
  validator: (value: string) => Message | boolean;
}

export const SelectWithDecorator2 = (props: SelectProps2) => {
  const { name, title, values } = props;
  const methods = useFormContext();

  return (
    <InputDecorator2 name={name} title={title}>
      <select
        {...methods.register(name, {
          validate: props.validator,
        })}
      >
        {values.map((val) => (
          <option value={val} key={'Sel' + val}>
            {val}
          </option>
        ))}
      </select>
    </InputDecorator2>
  );
};

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  name: string;
  title: string;
  values: string[];
}

export const SelectWithDecorator = forwardRef(
  (props: SelectProps, ref: ForwardedRef<HTMLSelectElement>) => {
    const { name, title, values } = props;
    return (
      <InputDecorator name={name} title={title}>
        <select {...props} ref={ref}>
          {values.map((val) => (
            <option value={val} key={'Sel' + val}>
              {val}
            </option>
          ))}
        </select>
      </InputDecorator>
    );
  }
);
