import React from "react";
import "./index.scss";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Launches from "../Launches";
import LaunchItem from "../LaunchItem";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route path="/" exact>
          <Launches />
        </Route>

        <Route path="/flight/:flight_id">
          <LaunchItem />
        </Route>
      </Router>
    </ApolloProvider>
  );
}

export default App;
