import { PipeableStream, renderToPipeableStream } from 'react-dom/server';
import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { CardsApp } from './cards-app';
import { AppContextProvider, ModalDialogProvider } from './providers';
import { defaultRoutes } from './routes';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setupStore } from './store';
import { MemoryRouter } from 'react-router-dom';
import { AboutPage } from './pages';
import { ReadStream } from 'fs';
import App from './App';
import { entryRender } from './entry-shared';

export function gc(url: string): ReactNode {
  return <div id="root">{entryRender()}</div>;
}
