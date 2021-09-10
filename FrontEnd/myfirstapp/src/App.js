  
  
import React, { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AddPerson from "./components/Persons/AddPerson";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import Logout from "./components/UserManagement/Logout";
import Catalogue from "./components/Catalogue";

import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./securityUtils/SecureRoute";
import {UserContextProvider} from './components/UserManagement/UserContext';


const jwtToken = localStorage.jwtToken;

if (jwtToken) {

  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);

  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  if (decoded_jwtToken.exp < currentTime) {
    
    store.dispatch(logout());
    window.location.href = "/";
  } 
}



export const App = () => {

  
  

  return (
    <UserContextProvider>
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Switch>
              {
                //Public Routes
              }
            
              <Route exact path="/">
                <Redirect to="/landing"/> 
              </Route>
              <Route path="/landing" exact component={Landing} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/logout" exact component={Logout} />

              {
                //Private Routes
              }
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/catalogue" component={Catalogue} />
              <Route exact path="/addPerson" component={AddPerson} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </UserContextProvider>
  );
  
}

export default App;