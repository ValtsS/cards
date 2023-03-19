import React from 'react';

class ThrowsError extends React.Component {
  render() {
    const showError = true;
    return (
      <div>
        {showError &&
          (() => {
            throw new Error('Something went wrong!!');
          })()}
        <p>Other content...</p>
      </div>
    );
  }
}

export default ThrowsError;
