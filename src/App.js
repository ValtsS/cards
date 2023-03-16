import './App.css';
import React from 'react';
import ErrorPage from './routes/error-page';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ThrowsError from './components/throws-error';
import RootLayout from './routes/root-layout';
import AboutPage from './components/about-page';
import MainPage from './components/main-page';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      throwError: props?.throwError || false,
    };
  }
  componentDidCatch(error) {
    console.error('error caught:', error);
    this.setState({
      hasError: true,
      error: error,
    });
  }
  render() {
    if (this.state.hasError) {
      return React.createElement(ErrorPage, { error: this.state.error });
    }
    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        BrowserRouter,
        null,
        React.createElement(
          Routes,
          null,
          React.createElement(Route, {
            path: '/',
            element: this.state.throwError
              ? React.createElement(ThrowsError, null)
              : React.createElement(RootLayout, null, React.createElement(MainPage, null)),
          }),
          React.createElement(Route, {
            path: '/about',
            element: this.state.throwError
              ? React.createElement(ThrowsError, null)
              : React.createElement(RootLayout, null, React.createElement(AboutPage, null)),
          }),
          React.createElement(Route, {
            path: '*',
            element: React.createElement(ErrorPage, { error: new Error('Error 404') }),
          })
        )
      )
    );
  }
}
export default App;
