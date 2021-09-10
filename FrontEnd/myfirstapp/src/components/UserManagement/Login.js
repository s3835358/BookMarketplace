  
import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import classnames from "classnames";
import { UserContext } from "./UserContext";

export const Login = () => {
  
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const{user,setUser} = useContext(UserContext);
  const{token,setToken} = useContext(UserContext);

  function handleSubmit() {
    var req = {
        "username": username,
        "password": password, 
    }

    // Post request to api, passing our username and password as data
    axios.post(`https://sept-login-service.herokuapp.com/api/users/login`,req).then(res => {
        console.log(res.data);

        if(res.data.success) {
            setToken(String(res.data.token))
            setUser(username)
        } else{
            // Tell user what went wrong with submission
            alert(res.data.message);
        }

    }).catch(err =>{
        // Tell user what went wrong with submission
        alert(err);
    })
  }

  function usernameChange(e) {
    setUsername(e.target.value);
  }

  function pwordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            
            <div className="form-group">
              <input
                type="text"
                className={classnames("form-control form-control-lg")}
                placeholder="Email Address"
                name="username"
                value={username}
                onChange={usernameChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className={classnames("form-control form-control-lg")}
                placeholder="Password"
                name="password"
                value={password}
                onChange={pwordChange}
              />
            </div>
            <input type="submit" onClick={handleSubmit} className="btn btn-info btn-block mt-4" />
            
          </div>
        </div>
      </div>
    </div>
  );
  
}
export default Login;
