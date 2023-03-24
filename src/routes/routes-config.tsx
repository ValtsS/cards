import FormerPage from '../pages/former-page';
import React from 'react';
import AboutPage from '../pages/about-page';
import MainPage from '../pages/main-page';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  displayInMenu?: boolean;
  menuText?: string;
}

export const defaultRoutes: RouteConfig[] = [
  {
    path: '/',
    element: <MainPage />,
    displayInMenu: true,
    menuText: 'Main',
  },
  {
    path: '/about',
    element: <AboutPage />,
    displayInMenu: true,
    menuText: 'About us',
  },
  {
    path: '/former',
    element: <FormerPage />,
    displayInMenu: true,
    menuText: 'Form',
  },
];
