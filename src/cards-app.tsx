import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RootLayout } from './routes/root-layout';
import { CardProviderStore } from './providers/card-provider';
import { LocalStorageProvider } from './providers/local-storage-provider';
import MainPage from './components/main-page';
import AboutPage from './components/about-page';
import ErrorPage from './routes/error-page';

export interface CardsAppProps {
  cardStore: CardProviderStore;
  localStore: LocalStorageProvider;
}

class CardsApp extends React.Component<CardsAppProps> {
  static defaultProps = {
    cardStore: new CardProviderStore(),
    localStore: new LocalStorageProvider(),
  };

  constructor(props: CardsAppProps) {
    super(props);
  }

  render() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <RootLayout fancyName="Main page">
                  <MainPage
                    cardProvider={this.props.cardStore}
                    localStoreProvider={this.props.localStore}
                  />
                </RootLayout>
              }
            />
            <Route
              path="/about"
              element={
                <RootLayout fancyName="About page">
                  <AboutPage />
                </RootLayout>
              }
            />

            <Route path="*" element={<ErrorPage error={new Error('Error 404')} />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default CardsApp;
