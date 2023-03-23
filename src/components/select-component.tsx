import React, { ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import Decorator from './input-decorator';

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  name: string;
  title: string;
  values: string[];
}

export const SelectWithDecorator = forwardRef(
  (props: SelectProps, ref: ForwardedRef<HTMLSelectElement>) => {
    const { name, title, values } = props;
    return (
      <Decorator name={name} title={title}>
        <select {...props} ref={ref}>
          {values.map((val) => (
            <option value={val} key={'Sel' + val}>
              {val}
            </option>
          ))}
        </select>
      </Decorator>
    );
  }
);
