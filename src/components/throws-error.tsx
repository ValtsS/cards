import React from 'react';

class ThrowsError extends React.Component {
  render() {
    throw new Error('Something went wrong!!');
    return (
      <div>
        <h1>All Items</h1>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </div>
    );
  }
}

export default ThrowsError;
