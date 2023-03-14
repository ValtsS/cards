import App from './../App';
import React from 'react';

class Root extends React.Component {
  render(): React.ReactNode {
    return (
      <>
        <div>Tis a root page</div>
        <App />
      </>
    );
  }
}

export default Root;
