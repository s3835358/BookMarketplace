  
import React, { useState } from "react";
import axios from "axios";
import classnames from "classnames";
import { useUserContext } from "./UserContext";
import jwt_decode from "jwt-decode";
import store from "../../store";
import {SET_CURRENT_USER} from "../../actions/types";
import { useRouteMatch } from "react-router-dom";
import '../Background.css'

export const Login = props => {
  
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const{setUser} = useUserContext();

  function handleSubmit(event) {

    var req = {
        "username": username,
        "password": password, 
    }

    event.preventDefault();
    
    // Post request to api, passing our username and password as data
    axios.post(`https://sept-login-service.herokuapp.com/api/users/login`,req).then(res => {

        if(res.data.success) {
                        
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
            localStorage.setItem("id", decoded.id);
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
<>
    <div className="background4" >
      <div className="login">
        <div className="container">
          <div className="row" >
            
            <div className="form-group">
              <input
                type="text"
                className={classnames("form-control form-control-lg")}
                placeholder="Email Address"
                name="username"
                onChange={usernameChange}
              />
            <div style={{paddingLeft:"20%",paddingTop:"14%", display:"flex",
            width:"80%", flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
              
              <div style={{backgroundColor:"white", borderRadius:"10px", 
              padding:"0.5% 5% 0.5% 5%"}}>
                <h1 className="display-4 text-center" >Log In</h1>
                <p/>
              </div>
              <p/>
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
              <input type="submit" onClick={handleSubmit}  style={{backgroundColor:"black", 
              borderColor:"black",color:"white"}} 
              className="btn btn-info btn-block mt-4" />
              
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</>
 
  );
  
}
export default Login;

