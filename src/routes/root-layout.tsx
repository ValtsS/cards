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
        <header>
          <h1>Uber page</h1>
          <nav>
            <ul>
              <li>
                <Link to="/">Main</Link>
              </li>
              <li>
                <Link to="/about">About us</Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>{this.props.children}</main>
        <div></div>
        <footer>
          <p>(c) Valts</p>
        </footer>
      </>
    );
  }
}

export default RootLayout;
