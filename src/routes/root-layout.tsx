import LinkEx from '../components/link-ex';
import React from 'react';
import AppState from '../appstate';
import './root-layout.css';
import { withRouter, WithRouterProps } from '../components/router-hoc';

interface RootLayoutProps extends WithRouterProps {
  children: React.ReactNode;
  fancyName?: string;
}

class RootLayoutInt extends React.Component<RootLayoutProps, AppState> {
  render(): React.ReactNode {
    const { location, fancyName } = this.props;
    return (
      <>
        <header>
          <p className="currpath">
            <span>This {fancyName} is located at: </span>
            <span>{location.pathname}</span>
          </p>
          <nav>
            <ul>
              <li>
                <LinkEx to="/" path={location.pathname}>
                  Main
                </LinkEx>
              </li>
              <li>
                <LinkEx to="/about" path={location.pathname}>
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

export const RootLayout = withRouter(RootLayoutInt);
