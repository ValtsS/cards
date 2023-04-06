import { Header } from '@/components';
import Overlay from '@/components/overlay/overlay';
import { useModalDialog } from '@/providers';
import React, { ReactElement } from 'react';
import './root-layout.css';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = (props: RootLayoutProps): ReactElement => {
  const { state, hide } = useModalDialog();

  return (
    <>
      <Overlay isOpen={state.show} onClose={hide}>
        {state.control}
      </Overlay>
      <Header fancyName="CompanyName"></Header>
      <main>{props.children}</main>
      <footer>
        <p>(c) Valts</p>
      </footer>
    </>
  );
};
