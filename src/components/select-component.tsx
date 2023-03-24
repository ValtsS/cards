import React, { ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import InputDecorator from './input-decorator';

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
