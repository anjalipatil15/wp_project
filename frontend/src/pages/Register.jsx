import React from "react";
import "./Register.css";

const Register = () => {
  return (
    <div className="signup-page">
      <header>
        <nav>
          <div className="logo">Discord</div>
        </nav>
      </header>

      <div className="main-container">
        <div className="signup-container">
          <div className="signup-header">
            <h1>Create an account</h1>
            <p>Join the Discord community today!</p>
          </div>

          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" required />
              <div className="hint">Password must be at least 8 characters long</div>
            </div>

            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input type="date" id="dob" required />
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                I have read and agree to Discord's Terms of Service and Privacy Policy
              </label>
            </div>

            <button type="submit">Continue</button>

            <div className="login-link">
              <span>Already have an account? </span>
              <a href="/login">Log In</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
