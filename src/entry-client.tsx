import { ApolloClient, InMemoryCache } from '@apollo/client';
import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { CardsApp } from './cards-app';
import { AppContextProvider, ModalDialogProvider } from './providers';
import { defaultRoutes } from './routes';
import { setupStore } from './store';
import { BrowserRouter } from 'react-router-dom';
import { entryRender } from './entry-shared';


const client = new ApolloClient({
    uri: 'http://ng4.velns.org:8000/graphql',
    cache: new InMemoryCache(),
  });

  const store = setupStore();

const root = document.getElementById("root") as HTMLElement;
console.log('reached',root);
hydrateRoot(
  root,
entryRender()
  );
