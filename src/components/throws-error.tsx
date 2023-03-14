import React from 'react';

class ThrowsError extends React.Component {
  render() {
    throw new Error('Something went wrong!!');
    return <></>;
  }
}

export default ThrowsError;
