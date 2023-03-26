import FormerPage from '../pages/former-page';
import React from 'react';
import MainPage from '../pages/main-page';
import { AboutPage } from '../pages';

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
    path: '/former',
    element: <FormerPage />,
    displayInMenu: true,
    menuText: 'Form',
  },
  {
    path: '/about',
    element: <AboutPage />,
    displayInMenu: true,
    menuText: 'About us',
  },
];
