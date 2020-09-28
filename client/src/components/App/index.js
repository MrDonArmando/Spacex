import React from "react";
import "./index.scss";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Launches from "../Launches";
import Launch from "../Launch";
import logo from "../../images/logo.png";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div
          className="container-full pd-all-20"
          onScroll={() => console.log("SCROLLING..........")}
        >
          <img
            src={logo}
            alt="SpaceX"
            style={{ width: 300, display: "block", margin: "auto" }}
          />
          <Switch>
            <Route exact path="/">
              <Launches />
            </Route>

            <Route exact path="/launch/:flight_number">
              <Launch />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
