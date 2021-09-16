import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Header from "./components/Header/Header";
import { GlobalStateProvider } from "./hooks/GlobalStateProvider";

import { routes } from "./routes";
import { GlobalStyle } from "./style/GlobalStyle";

export default function App() {
  return (
    <GlobalStateProvider>
      <GlobalStyle />
      <Router>
        <Auth />
        <Header />
        <Switch>
          {routes.map((route, idx) => {
            return (
              <Route
                exact
                path={route.path}
                key={idx}
                render={() => <route.component />}
              />
            );
          })}
        </Switch>
      </Router>
    </GlobalStateProvider>
  );
}
