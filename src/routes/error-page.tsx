import React from 'react';
import { Link } from 'react-router-dom';

interface ErrorPageProps {
  error: Error | null;
}

class ErrorPage extends React.Component<ErrorPageProps> {
  render() {
    return (
      <>
        <div>
          <h1>Oops! Something went wrong.</h1>
          <p>{this.props.error?.message || 'Unknown error'}</p>
        </div>
      </>
    );
  }
}

export default ErrorPage;
