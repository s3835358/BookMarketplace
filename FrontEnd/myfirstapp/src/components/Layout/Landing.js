import React from "react";
import './Landing.css';
import { Link } from "react-router-dom";

export const Landing = () => {

  return (
    <div className="landing">
      <div className="light-overlay landing-inner text-dark">
        <div className="container">
          <div className="row">
            <div className="landing-title">
              <h1 className="display-3 mb-4">
                BOOKEROO
              </h1>
              <div>
                <Link className="btn btn-lg btn-light mr-2" style = {({margin:"20px 20px"})} to="/register">
                  Sign Up
                </Link>
                
                <Link className="btn btn-lg btn-light mr-2" style = {({margin:"20px 20px"})} to="/login">
                  Login
                </Link>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Landing;