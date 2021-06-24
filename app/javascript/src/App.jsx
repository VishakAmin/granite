import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "./common/logger";
import Dashboard from "./components/Dashboard/index";
import CreateTask from "./components/Tasks/CreateTask";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    initializeLogger();
    registerIntercepts();

    setAuthHeaders(setLoading);
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              {" "}
              <h1>Home</h1>
            </div>
          )}
        />
        <Route exact path="/about" render={() => <div>About </div>} />
        <Route exact path="/tasks/create" component={CreateTask} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
