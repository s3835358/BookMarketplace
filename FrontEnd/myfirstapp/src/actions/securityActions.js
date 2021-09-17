import axios from "axios";
import {GET_ERRORS, SET_CURRENT_USER} from "./types";
import setJWTToken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";
import { useUserContext } from "../components/UserManagement/UserContext";


export const createNewUser = (newUser, history) => async dispatch => {


    try{
        await axios.post("https://sept-login-service.herokuapp.com/api/users/register", newUser).then((response) => {         
            
            console.log(response.data);
        });
        
        history.push("/login");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }
    catch (err){
        console.log(err);
        dispatch ({
            type: GET_ERRORS,
            payload: err.response.data
        });

    }

};

export const login = LoginRequest => async dispatch => {
    
  const{setUser} = useUserContext();

  try {
    // post => Login Request
    const res = await axios.post("https://sept-login-service.herokuapp.com/api/users/login", LoginRequest);
    // extract token from res.data

    setUser(LoginRequest.username);
    const { token } = res.data;
    // store the token in the localStorage
    localStorage.setItem("jwtToken", token);
    // set our token in header ***
    setJWTToken(token);
    // decode token on React
    const decoded = jwt_decode(token);
    // dispatch to our securityReducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });

  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }

};
  
  export const logout = () => async dispatch => {

    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    setJWTToken(false);
    
    dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    });
    
};
