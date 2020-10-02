import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "../auth/Login";
import Register from "../auth/Register";
import Dashboard from "../layout/Dashboard";
import Files from "../files/Files";
import UploadFile from "../files/UploadFile";
import NotFound from "../layout/NotFound";

const routes = () => {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/files" component={Files} />
        <PrivateRoute exact path="/upload-file" component={UploadFile} />
        <Route exact component={NotFound} />
      </Switch>
    </div>
  );
};

export default routes;
