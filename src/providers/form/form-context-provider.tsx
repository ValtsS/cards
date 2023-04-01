import { CardErrors } from '@/components/card-creator/card-validator';
import React from 'react';

type FormContextValue = {
  errors: CardErrors;
};

export const FormContext = React.createContext<FormContextValue>({
  errors: {},
});

type FormContextProviderProps = {
  children: React.ReactNode;
  errors: CardErrors;
};

export const FormContextProvider = ({ children, errors }: FormContextProviderProps) => {
  return <FormContext.Provider value={{ errors: errors }}>{children}</FormContext.Provider>;
};

export function useFormContext() {
  const store = React.useContext(FormContext);
  if (!store) {
    throw new Error('useFormContext must be used within a FormContextProvider');
  }
  return store;
}
