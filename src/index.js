import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import DriverLayout from "layouts/Driver.js";
import App from "./components/App/App";
import "normalize.css";
import "./index.scss";
import * as serviceWorker from "./components/App/serviceWorker";
import App_chat from "./components/App/App_chat";
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/auth" render={props => <AuthLayout {...props} />} />
      <Route path="/driver" render={props => <DriverLayout{...props} />} />
      <Route path="/app" render={props => <App{...props} />} />
      <Redirect from="/" to="/admin/index" />
    </Switch>

  </BrowserRouter>,

  document.getElementById("root")
);

