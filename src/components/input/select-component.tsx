import React, { HTMLAttributes, ReactElement } from 'react';
import { Message, useFormContext } from 'react-hook-form';
import { InputDecorator } from './input-decorator';

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  name: string;
  title: string;
  values: string[];
  validator: (value: string) => Message | boolean;
}

export const SelectWithDecorator = (props: SelectProps): ReactElement => {
  const { name, title, values } = props;
  const methods = useFormContext();

  return (
    <InputDecorator name={name} title={title}>
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
    </InputDecorator>
  );
};
