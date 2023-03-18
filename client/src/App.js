// import logo from './logo.svg';
import React from "react";
import "./app.css";
import "./assets/styles/style.css";
import "./assets/styles/result.css";

import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/index";
import About from "./pages/about";
import login from "./pages/login";
import Branches from "./pages/branches";
import guides from "./pages/guides";
import contact from "./pages/contact";
import reservation from "./pages/dashboard/reservations";
import Result from "./pages/test-result";
import addcustomer from "./pages/dashboard/addcustomer";
import Dashboard from "./pages/dashboard/index";
import Messages from "./pages/dashboard/messages";
import Visit from "./pages/house-vist";
import Admin from "./pages/register/admin";
import Leader from "./pages/register/teamleader";
import Employer from "./pages/register/employer";
import CustomerResult from "./pages/result/identity_Number";
import Users from "./pages/dashboard/users";
import EditPassword from "./pages/dashboard/EditPassword";
import EditCustomer from "./pages/dashboard/EditCustomer";
import Dashboard2 from "./pages/dashboard/Dashboard";
import AddextReport from "./pages/dashboard/AddextReport";

function App() {
  const time = localStorage.getItem("time");
  const d = new Date();
  let timenow = d.getTime();
  if (time) {
    if (timenow - time >= 1000 * 60 * 60 * 2) {
      localStorage.removeItem("user");
      localStorage.removeItem("time");
    }
  } else {
    localStorage.removeItem("user");
    localStorage.removeItem("time");
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={login} />
          <Route exact path="/branches" component={Branches} />
          <Route exact path="/guides" component={guides} />
          <Route exact path="/contact" component={contact} />
          <Route exact path="/test-result" component={Result} />
          <Route exact path="/customer/result" component={CustomerResult} />

          <Route exact path="/house-visit" component={Visit} />
          <Route exact path="/register/admin" component={Admin} />
          <Route exact path="/register/leader" component={Leader} />
          <Route exact path="/register/employer" component={Employer} />

          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard2" component={Dashboard2} />

          <Route exact path="/dashboard/reservations" component={reservation} />

          <Route exact path="/dashboard/add-customer" component={addcustomer} />

          <Route exact path="/dashboard/messages" component={Messages} />
          <Route
            exact
            path="/dashboard/addexternal-report"
            component={AddextReport}
          />

          <Route exact path="/dashboard/users" component={Users} />
          <Route
            exact
            path="/dashboard/edit-customer"
            component={EditCustomer}
          />

          <Route
            exact
            path="/dashboard/edit-password"
            component={EditPassword}
          />
        </Switch>
      </Router>
      ,
    </div>
  );
}

export default App;
