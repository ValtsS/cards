import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RootLayout } from './routes/root-layout';
import ErrorPage from './routes/error-page';
import { RouteConfig, defaultRoutes } from './routes/routes-config';

export interface CardsAppProps {
  routesConfig: RouteConfig[];
}

class CardsApp extends React.Component<CardsAppProps> {
  static defaultProps = {
    routesConfig: defaultRoutes,
  };

  constructor(props: CardsAppProps) {
    super(props);
  }

  render() {
    const { routesConfig } = this.props;

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
  }
}

export default CardsApp;
