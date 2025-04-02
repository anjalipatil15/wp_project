import React from "react";
import "./Login.css";

const Login = () => {
    return (
        <div className="main-container">
            <div className="login-container">
                <div className="login-header">
                    <h1>Welcome Back!</h1>
                    <p>We're so excited to have you back!</p>
                </div>

                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" required />
                    </div>

                    <div className="remember-me">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember">Remember Me</label>
                    </div>

                    <div className="forgot-password">
                        <a href="#">Forgot Password?</a>
                    </div>

                    <button type="submit">Log In</button>

                    <div className="signup-link">
                        <span>Need an account? </span>
                        <a href="/signup">Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

