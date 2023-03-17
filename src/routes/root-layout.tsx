import LinkEx from '../components/link-ex';
import React from 'react';
import AppState from '../appstate';
import './root-layout.css';

interface RootLayoutProps {
  children: React.ReactNode;
  currentPath: string;
}

class RootLayout extends React.Component<RootLayoutProps, AppState> {
  render(): React.ReactNode {
    return (
      <>
        <header>
          <nav>
            <ul>
              <li>
                <LinkEx to="/" path={this.props.currentPath}>
                  Main
                </LinkEx>
              </li>
              <li>
                <LinkEx to="/about" path={this.props.currentPath}>
                  About us
                </LinkEx>
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
