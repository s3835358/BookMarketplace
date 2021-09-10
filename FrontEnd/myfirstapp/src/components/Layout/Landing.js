import React, { useEffect, useState } from "react";
import './Landing.css';
import { Link } from "react-router-dom";
import {useUserContext} from '../UserManagement/UserContext';

export const Landing = () => {

  const {user} = useUserContext();
  const [logged, setLogged] = useState(false);

  useEffect (() => {
      if(user === "") {
          setLogged(false);
      } else {
          setLogged(true);
          console.log(user);
          console.log("HERE");
      }
  }, [user]);

  return (
    <div className="landing">
      <div className="light-overlay landing-inner text-dark">
        <div className="container">
          <div className="row">
            <div className="landing-title">
              <h1 className="display-3 mb-4">
                BOOKEROO
              </h1>
              
              {logged?
                <div>Welcome <p>{user}</p></div> 
              :
                
                <div>
                  <Link className="btn btn-lg btn-light mr-2" style = {({margin:"20px 20px"})} to="/register">
                    Sign Up
                  </Link>
                  
                  <Link className="btn btn-lg btn-light mr-2" style = {({margin:"20px 20px"})} to="/login">
                    Login
                  </Link>
                </div>
              }
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Landing;