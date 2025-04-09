"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "./AuthForms.css"
import { Eye, EyeOff } from "lucide-react"

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      // Here you would connect to your backend API
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // if (!response.ok) {
      //   throw new Error('Invalid credentials');
      // }

      // const data = await response.json();
      // localStorage.setItem('token', data.token);
      // localStorage.setItem('user', JSON.stringify(data.user));

      // For demo purposes, we'll just navigate to home
      navigate("/")
    } catch (err) {
      setError(err.message || "Login failed. Please try again.")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="auth-header">
          <h1>Welcome back!</h1>
          <p>We're so excited to see you again!</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">EMAIL</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="password">PASSWORD</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <Link to="/forgot-password" className="forgot-password">
              Forgot your password?
            </Link>
          </div>

          <button type="submit" className="auth-button">
            Log In
          </button>

          <div className="auth-redirect">
            <span>Need an account?</span>
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm

