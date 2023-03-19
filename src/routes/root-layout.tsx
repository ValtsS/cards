import React from 'react';
import AppState from '../appstate';
import './root-layout.css';
import { Header } from '../components/header';

interface RootLayoutProps {
  children: React.ReactNode;
}

export class RootLayout extends React.Component<RootLayoutProps, AppState> {
  render(): React.ReactNode {
    return (
      <>
        <Header fancyName="CompanyName"></Header>
        <main>{this.props.children}</main>
        <div></div>
        <footer>
          <p>(c) Valts</p>
        </footer>
      </>
    );
  }
}
