import React, { ReactElement, useEffect } from 'react';
import reactLogo from '../../assets/react.svg';
import './about-page.css';
import { useNotifications } from '@/providers';

export const AboutPage = (): ReactElement => {
  const { setMessage } = useNotifications();

  useEffect(() => setMessage('This is an emergency notifications test', false), [setMessage]);

  return (
    <>
      <p>Fantastic about page of module01 react project</p>
      <img src={reactLogo} className="logo react" alt="React logo" />
      <p>Too bad I am not a designer at all!</p>
    </>
  );
};
