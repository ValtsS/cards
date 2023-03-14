import './App.css';
import React from 'react';
import AppState from './appstate';
import ErrorPage from './routes/error-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ThrowsError from './components/throws-error';
import RootLayout from './routes/root-layout';

interface AppProps
{
  throwError:boolean
}

class App extends React.Component<AppProps, AppState> {
  constructor(params:AppProps, props: AppState) {
    super(params, props);

    this.state = {
      hasError: false,
      error: null,
      throwError: params.throwError
    };
  }

  componentDidCatch(error: Error) {
    console.log(error);
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
            <Route path="/" element={
                this.state.throwError ? ( <ThrowsError/> ) : (<RootLayout/>)
              }  />
            <Route path="*" element={<ErrorPage error={new Error('Error 404')} />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
