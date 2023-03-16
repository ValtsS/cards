import React from 'react';
class ThrowsError extends React.Component {
  render() {
    throw new Error('Something went wrong!!');
    return React.createElement('div', null);
  }
}
export default ThrowsError;
