import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, { createNetworkInterface } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Router, Route, hashHistory, IndexRoute } from "react-router";

import App from "./components/App";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import DashBoard from "./components/DashBoard";
import RequireAuth from "./hoc/RequireAuth";

const networkInterface = createNetworkInterface({
  uri: "/graphql",
  opts: {
    // its say is safe to send cookies to same origin that browser run on it. (expresss server)
    credentials: "same-origin",
  },
});

const client = new ApolloClient({
  // help caching
  dataIdFromObject: (o) => o.id,
  // in charge to make actual nework req
  networkInterface,
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route path="login" component={LoginForm} />
          <Route path="signup" component={SignupForm} />
          <Route path="dashboard" component={RequireAuth(DashBoard)} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
