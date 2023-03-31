import { Header } from '@/components/header';
import React from 'react';
import './root-layout.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = (props: RootLayoutProps) => {
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
