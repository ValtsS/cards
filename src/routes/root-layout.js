import React from 'react';
import { Link } from 'react-router-dom';
class RootLayout extends React.Component {
  render() {
    return React.createElement(
      React.Fragment,
      null,
      React.createElement('h1', null, 'Uber page'),
      React.createElement(Link, { to: '/' }, 'Main'),
      React.createElement(Link, { to: '/about' }, 'About us'),
      React.createElement('div', null, this.props.children),
      'Footer goes here'
    );
  }
}
export default RootLayout;
