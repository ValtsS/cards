import React from 'react';

export interface WithInputProps {
  name: string;
  title: string;
}

export const withInputDecorations = <Props extends WithInputProps>(
  Component: React.ComponentType<Props>
) => {
  return (props: WithInputProps) => {
    return (
      <>
        <label htmlFor={props.name}>{props.title}:</label>
        <Component {...(props as Props)} />
        <br />
      </>
    );
  };
};
