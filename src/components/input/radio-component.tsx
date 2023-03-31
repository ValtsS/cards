import React, { HTMLAttributes } from 'react';
import { Message, useFormContext } from 'react-hook-form';
import { InputDecorator } from './input-decorator';

interface RadioProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  title: string;
  values: string[];
  validator: (value: string) => Message | boolean;
}

export const RadioWithDecorator = (props: RadioProps) => {
  const { name, title, values } = props;
  const methods = useFormContext();
  return (
    <InputDecorator name={name} title={title}>
      <fieldset>
        <legend>{title}</legend>

        {values.map((val) => (
          <div key={'RadioDiv' + val}>
            <label>
              <input
                type={'radio'}
                key={'Radio' + val}
                value={val}
                {...methods.register(name, { validate: props.validator })}
              />
              {val}
            </label>
          </div>
        ))}
      </fieldset>
    </InputDecorator>
  );
};
