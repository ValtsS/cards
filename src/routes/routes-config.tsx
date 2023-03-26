import React from 'react';
import { AboutPage, FormerPage, MainPage } from '../pages';

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
