import { ErrorPage, RootLayout, RouteConfig } from '@/routes';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AboutPage } from './pages';

export interface CardsAppProps {
  routesConfig: RouteConfig[];
}

export const CardsApp = (props: CardsAppProps) => {
  const { routesConfig } = props;


  return (<>{routesConfig[0].element}</>);

  return (
    <>


        <Routes>
          {routesConfig.map((c, index) => (
            <Route
              path={c.path}
              element={
                <RootLayout key={'rootlayout_ca_' + index.toString()}>{c.element}</RootLayout>
              }
              key={'route_ca_' + index.toString()}
            />
          ))}

          <Route path="*" element={<ErrorPage error={new Error('Error 404')} />} />
        </Routes>

    </>
  );
};
