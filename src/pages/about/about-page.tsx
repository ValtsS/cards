import React from 'react';
import reactLogo from '../../assets/react.svg';
import './about-page.css';

export class AboutPage extends React.Component {
  render() {
    return (
      <>
        <p>Fantastic about page of module01 react project</p>
        <img src={reactLogo} className="logo react" alt="React logo" />
        <p>Too bad I am not a designer at all!</p>
      </>
    );
  }
}
