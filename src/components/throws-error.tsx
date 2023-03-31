import React from 'react';

export const ThrowsError = () => {
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
};
