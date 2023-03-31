import React, { ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import { Message, useFormContext } from 'react-hook-form';
import { InputDecorator, InputDecorator2 } from './input-decorator';

interface RadioProps2 extends HTMLAttributes<HTMLInputElement> {
  name: string;
  title: string;
  values: string[];
  validator: (value: string) => Message | boolean;
}

export const RadioWithDecorator2 = (props: RadioProps2) => {
  const { name, title, values } = props;
  const methods = useFormContext();
  return (
    <InputDecorator2 name={name} title={title}>
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
    </InputDecorator2>
  );
};

interface RadioProps extends HTMLAttributes<HTMLInputElement> {
  name: string;
  title: string;
  values: string[];
  forwardedRefs?: ForwardedRef<HTMLInputElement>[];
}

export const RadioWithDecorator = forwardRef(
  (props: RadioProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { name, title, values, forwardedRefs } = props;
    return (
      <InputDecorator name={name} title={title}>
        <fieldset>
          <legend ref={ref}>{title}</legend>

          {values.map((val, index) => (
            <div key={'RadioDiv' + val}>
              <label>
                <input
                  type={'radio'}
                  name={name}
                  key={'Radio' + val}
                  value={val}
                  ref={forwardedRefs ? forwardedRefs[index] : null}
                />
                {val}
              </label>
            </div>
          ))}
        </fieldset>
      </InputDecorator>
    );
  }
);
