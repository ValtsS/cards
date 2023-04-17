import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { CardsApp } from "./cards-app";
import { AppContextProvider, ModalDialogProvider } from "./providers";
import { defaultRoutes } from "./routes";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setupStore } from "./store";

export const entryRender = () => {

    const client = new ApolloClient({
        uri: 'http://ng4.velns.org:8000/graphql',
        cache: new InMemoryCache(),
      });

      const store = setupStore();

    return (
<React.StrictMode>
    <App>
      <Provider store={store}>
        <AppContextProvider apolloClient={client}>
          <ModalDialogProvider>

            <CardsApp routesConfig={defaultRoutes} />

          </ModalDialogProvider>
        </AppContextProvider>
      </Provider>
    </App>
    </React.StrictMode>
    );
}