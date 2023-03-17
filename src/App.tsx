import './App.css';
import React from 'react';
import AppState from './appstate';
import ErrorPage from './routes/error-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ThrowsError from './components/throws-error';
import RootLayout from './routes/root-layout';
import AboutPage from './components/about-page';
import MainPage from './components/main-page';
import { CardProviderStore } from './providers/card-provider';
import { LocalStorageProvider } from './providers/local-storage-provider';
import { RouteConfig, routesConfig } from 'routes/routes-config';

interface AppProps {
  throwError?: boolean;
}

class App extends React.Component<AppProps, AppState> {
  cardStore: CardProviderStore;
  localStore: LocalStorageProvider;

  constructor(props: AppProps) {
    super(props);
    this.cardStore = new CardProviderStore();
    this.localStore = new LocalStorageProvider();

    this.state = {
      hasError: false,
      error: null,
      throwError: props?.throwError || false,
    };
  }

  componentDidCatch(error: Error) {
    console.error('error caught:', error);
    this.setState({
      hasError: true,
      error: error,
    });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return <ErrorPage error={this.state.error} />;
    }

    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                this.state.throwError ? (
                  <ThrowsError />
                ) : (
                  <RootLayout currentPath="/">
                    <MainPage cardProvider={this.cardStore} localStoreProvider={this.localStore} />
                  </RootLayout>
                )
              }
            />
            <Route
              path="/about"
              element={
                <RootLayout currentPath="/about">
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

export default App;
