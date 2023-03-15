import React from 'react';
import { Link } from 'react-router-dom';

interface ErrorPageProps {
  error: Error | null;
}

export const unkErrorText: string = 'Unknown error';

class ErrorPage extends React.Component<ErrorPageProps> {

  render() {
    return (
      <>
        <div>
          <h1>Oops! Something went wrong.</h1>
          <p>{this.props.error?.message || unkErrorText }</p>
        </div>
      </>
    );
  }
}

export default ErrorPage;
