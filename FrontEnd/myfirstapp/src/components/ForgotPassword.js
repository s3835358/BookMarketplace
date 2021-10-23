import React, { useRef, useState } from "react";
import { useAuth } from "./UserManagement/Login";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";

// WAIT FOR KIM TO DO BACKEND


export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

 
  const requestPassword = function(){
    axios.post(`https://sept-login-service.herokuapp.com/api/users/resetPassword`,req).then(res => {

          });

  }
  
  return (
    <>
      <div className="forgot-password-background"></div>
      <div className="forgot-password-card">
        <div>
          <h2 className="forgot-password-header">Password Reset</h2>
          {error && <div className="forgot-password-error">{error}</div>}
          {message && <div className="forgot-password-success">{message}</div>}
          <form onSubmit={handleSubmit}>
            <div id="email">
              <label className="forgot-password-label">Email</label>
              <input className="forgot-password-email" type="email" ref={emailRef} required />
            </div>
            <button disabled={loading} className="forgot-password-submit" type="submit">
              Reset Password
            </button>
          </form>
          <div className="">
            <Link className="forgot-password-links" to="/login"> <button className="forgot-password-submit" type="submit">Login</button></Link>
          </div>
        </div>
        <div className="signup-div">
          Need an account? <Link className="forgot-password-links" to="/signup">Sign Up</Link>
        </div>
      </div>
    </>
  );
}
