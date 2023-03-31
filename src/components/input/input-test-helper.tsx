import React from 'react';
import { FormProvider, Message, useForm } from 'react-hook-form';
import { InputDecorator } from './input-decorator';

type TestForm = {
  testField: string;
};

export const TestHelper = () => {
  const methods = useForm<TestForm>({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
  const require = (value: string): Message | boolean => {
    if (value == 'BAD') return value;

    return true;
  };

  const onSubmit = () => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <InputDecorator title={'Title'} name={'testField'}>
          <input
            {...methods.register('testField', {
              validate: require,
            })}
            type="text"
          />
          <input type="submit" />
        </InputDecorator>
      </form>
    </FormProvider>
  );
};
