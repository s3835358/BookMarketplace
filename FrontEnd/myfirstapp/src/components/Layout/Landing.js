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
              
              <Link className="btn btn-lg btn-primary mr-2" to="/register">
                Sign Up
              </Link>
              &nbsp;
              <Link className="btn btn-lg btn-secondary mr-2" to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Landing;