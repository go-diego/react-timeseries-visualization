import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "../pages/Home";
import TimeseriesPage from "../pages/Timeseries";
// import NotFoundPage from "../pages/NotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/timeseries/:id" component={TimeseriesPage} />
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </Router>
  );
}

export default App;
