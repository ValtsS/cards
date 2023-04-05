import { LinkEx } from '@/components';
import { defaultRoutes } from '@/routes/routes-config';
import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import './header.css';

export const Header = ({ fancyName }: { fancyName: string }): ReactElement => {
  const location = useLocation();

  return (
    <>
      <header>
        <p className="currpath">
          <span className="companyName">{fancyName}</span>
          <span>
            Welcome to {defaultRoutes.find((x) => x.path == location.pathname)?.menuText} page we
            are located at:{' '}
          </span>
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
};
