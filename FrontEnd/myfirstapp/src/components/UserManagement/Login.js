  
import React, { useState } from "react";
import axios from "axios";
import classnames from "classnames";
import { useUserContext } from "./UserContext";
import jwt_decode from "jwt-decode";
import store from "../../store";
import {SET_CURRENT_USER} from "../../actions/types";

export const Login = props => {
  
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const{setUser} = useUserContext();
  const{token,setToken} = useUserContext();

  function handleSubmit(event) {

    var req = {
        "username": username,
        "password": password, 
    }

    event.preventDefault();
    
    // Post request to api, passing our username and password as data
    axios.post(`https://sept-login-service.herokuapp.com/api/users/login`,req).then(res => {
        console.log(res.data);

        if(res.data.success) {
            
            console.log("hfg: ")
            console.log(res.data.token)
            console.log(res.data[`token`])
            
            const { token } = res.data;

            const decoded = jwt_decode(token);
            // dispatch to our securityReducer
            store.dispatch({
              type: SET_CURRENT_USER,
              payload: decoded
            });

            setUser(username)
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("user", username);
            console.log("hfg: " + token)
            props.history.push("/");

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
