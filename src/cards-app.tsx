import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RouteConfig, defaultRoutes, ErrorPage, RootLayout } from '@/routes';

export interface CardsAppProps {
  routesConfig: RouteConfig[];
}

export const CardsApp = (props: CardsAppProps) => {
  const { routesConfig } = props;

  return (
    <>
      <BrowserRouter>
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
      </BrowserRouter>
    </>
  );
};
