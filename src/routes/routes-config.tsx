import FormerPage from '../components/former-page';
import React from 'react';
import AboutPage from '../components/about-page';
import MainPage from '../components/main-page';

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
