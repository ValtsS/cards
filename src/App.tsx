import './App.css';
import React from 'react';
import AppState from './appstate';
import ErrorPage from './routes/error-page';
import { BrowserRouter } from 'react-router-dom';

interface AppProps {
  children?: React.ReactNode;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  componentDidCatch(error: Error) {
    console.error('error caught: ', error);
    this.setState({
      hasError: true,
      error: error,
    });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <>
          <BrowserRouter>
            <ErrorPage error={this.state.error} />
          </BrowserRouter>
        </>
      );
    }

    return <>{this.props.children}</>;
  }
}

export default App;
