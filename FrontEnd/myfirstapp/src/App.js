  
  
import React from "react";
import "./App.css";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/Layout/Landing";
import Register from "./components/UserManagement/Register";
import AddBook from "./components/Admin/AddBook";
import EditBook from "./components/Admin/EditBook";
import UserList from "./components/Admin/UserList";
import BlackList from "./components/Admin/BlackList";
import Inbox from "./components/Admin/Inbox";
import Login from "./components/UserManagement/Login";
import Logout from "./components/UserManagement/Logout";
import Settings from "./components/UserManagement/Settings";
import Catalogue from "./components/Catalogue";
import AboutContact from "./components/AboutContact";
import Downloads from "./components/Admin/Downloads";

import jwt_decode from "jwt-decode";
import setJWTToken from "./securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import {UserContextProvider} from './components/UserManagement/UserContext';


const jwtToken = localStorage.jwtToken;

if (jwtToken) {

  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);

  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });
  // Logs user out after 30 seconds
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
              <Route path="/aboutContact" exact component={AboutContact} />

              {
                //Private Routes
              }
              <Route exact path="/catalogue" component={Catalogue} />
              <Route exact path="/addBook" component={AddBook} />
              <Route exact path="/editBook" component={EditBook} />
              <Route exact path="/userList" component={UserList} />
              <Route exact path="/blackList" component={BlackList} />
              <Route exact path="/inbox" component={Inbox} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/downloads" component={Downloads} />
              
            </Switch>
          </div>
        </Router>
      </Provider>
    </UserContextProvider>
  );
  
}

export default App;