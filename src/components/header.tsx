import LinkEx from './link-ex';
import React from 'react';
import AppState from '../appstate';
import { withRouter, WithRouterProps } from './router-hoc';
import './header.css';

interface HeaderProps extends WithRouterProps {
  fancyName: string;
}

export class HeaderInt extends React.Component<HeaderProps, AppState> {
  render(): React.ReactNode {
    const { location, fancyName } = this.props;
    return (
      <>
        <header>
          <p className="currpath">
            <span className="companyName">{fancyName}</span>
            <span>This page is located at: </span>
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
      </>
    );
  }
}

export const Header = withRouter(HeaderInt);
