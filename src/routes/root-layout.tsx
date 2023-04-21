import { Header } from '@/components/header';
import { Overlay } from '@/components/overlay';
import { useModalDialog, useNotifications } from '@/providers';
import React, { ReactElement } from 'react';
import './root-layout.css';
import { FloatNotification } from '@/components';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = (props: RootLayoutProps): ReactElement => {
  const { state, hide } = useModalDialog();
  const { state: notify } = useNotifications();
  return (
    <>
      <Overlay isOpen={state.show} onClose={hide}>
        {state.control}
      </Overlay>
      <Header fancyName="CompanyName"></Header>
      <FloatNotification message={notify.message} error={notify.error} />
      <main>{props.children}</main>
      <footer>
        <p>(c) Valts</p>
      </footer>
    </>
  );
};
