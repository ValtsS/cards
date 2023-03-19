import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RootLayout } from './routes/root-layout';
import MainPage from './components/main-page';
import AboutPage from './components/about-page';
import ErrorPage from './routes/error-page';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
}

export interface CardsAppProps {
  routesConfig: RouteConfig[];
}

const routes: RouteConfig[] = [
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
];

class CardsApp extends React.Component<CardsAppProps> {
  static defaultProps = {
    routesConfig: routes,
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
