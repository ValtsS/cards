import { CardErrors } from 'components/card-validator';
import React from 'react';

type FormContextValue = {
  errors: CardErrors;
};

export const FormContext = React.createContext<FormContextValue>({
  errors: {}
});

type FormContextProviderProps = {
  children: React.ReactNode;
  errors: CardErrors;
};

export const FormContextProvider = ({
  children,
  errors
}: FormContextProviderProps) => {
  return (
    <FormContext.Provider value={{ errors: errors }}>
      {children}
    </FormContext.Provider>
  );
};
