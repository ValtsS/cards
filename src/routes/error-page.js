import React from 'react';
export const unkErrorText = 'Unknown error';
class ErrorPage extends React.Component {
  render() {
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        'div',
        null,
        React.createElement('h1', null, 'Oops! Something went wrong.'),
        React.createElement('p', null, this.props.error?.message || unkErrorText)
      )
    );
  }
}
export default ErrorPage;
