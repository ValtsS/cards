import { Header } from '@/components';
import React, { ReactElement } from 'react';
import './root-layout.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = (props: RootLayoutProps): ReactElement => {
  return (
    <>
      <Header fancyName="CompanyName"></Header>
      <main>{props.children}</main>
      <footer>
        <p>(c) Valts</p>
      </footer>
    </>
  );
};
