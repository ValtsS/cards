import React from 'react';
import { Link } from 'react-router-dom';
import AppState from '../appstate';

interface WrapperProps {
  children: React.ReactNode;
}

class RootLayout extends React.Component<WrapperProps, AppState> {
  render(): React.ReactNode {
    return (
      <>
        <h1>Uber page</h1>
        <Link to="/">Main</Link>
        <Link to="/about">About us</Link>
        <div>{this.props.children}</div>
        Footer goes here
      </>
    );
  }
}

export default RootLayout;
