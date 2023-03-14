import App from '../App';
import React from 'react';
import AppState from '../appstate';

class RootLayout extends React.Component<object, AppState> {
  render(): React.ReactNode {
    return (
      <>
        <div>Tis a root page</div>
      </>
    );
  }
}

export default RootLayout;
