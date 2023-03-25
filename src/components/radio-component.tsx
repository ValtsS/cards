import React, { ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import InputDecorator from './input-decorator';

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
