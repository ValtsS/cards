import LinkEx from './link-ex';
import React from 'react';
import AppState from '../appstate';
import { withRouter, WithRouterProps } from './router-hoc';
import './header.css';
import { defaultRoutes } from '../routes/routes-config';

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
              {defaultRoutes.map(
                (route) =>
                  route.displayInMenu && (
                    <li key={'ul_' + route.path + route.menuText}>
                      <LinkEx
                        to={route.path}
                        path={location.pathname}
                        key={'link_' + route.menuText + route.path}
                      >
                        {route.menuText}
                      </LinkEx>
                    </li>
                  )
              )}
            </ul>
          </nav>
        </header>
      </>
    );
  }
}

export const Header = withRouter(HeaderInt);
