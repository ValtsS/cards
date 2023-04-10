import { AboutPage } from '@/pages/about';
import { FormerPage } from '@/pages/former';
import { MainPage } from '@/pages/main';
import React from 'react';

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
