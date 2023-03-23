import React from 'react';

interface Props {
  title: string;
  name: string;
  errormessage?: string;
  children: React.ReactNode;
}

export default class Decorator extends React.Component<Props> {
  render() {
    const { title, name, errormessage } = this.props;
    return (
      <>
        <label htmlFor={name}>{title}:</label>
        {this.props.children}
        {errormessage && (
          <>
            <br />
            <label>{errormessage}</label>
          </>
        )}
        <br />
      </>
    );
  }
}
