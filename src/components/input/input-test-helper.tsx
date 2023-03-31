import React from 'react';
import { FormProvider, Message, useForm } from 'react-hook-form';
import { InputDecorator } from './input-decorator';
import { RadioWithDecorator } from './radio-component';

type TestForm = {
  testField: string;
};

export const TestHelper = (props: { mode: string }) => {
  const methods = useForm<TestForm>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
  const require = (value: string): Message | boolean => {
    if (value == 'BAD') return '[' + value + ']';

    return true;
  };

  const onSubmit = () => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {props.mode == 'decorator' && (
          <>
            <p>{props.mode}</p>
            <InputDecorator title={'Title'} name={'testField'}>
              <input
                {...methods.register('testField', {
                  validate: require,
                })}
                type="text"
              />
            </InputDecorator>
          </>
        )}

        {props.mode == 'radio' && (
          <>
            <p>{props.mode}</p>

            <RadioWithDecorator
              name="radioflip"
              title="Image orientation"
              values={['GOOD', 'BAD']}
              validator={require}
            />
          </>
        )}

        <input type="submit" />
      </form>
    </FormProvider>
  );
};
