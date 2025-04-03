import React, { useState } from 'react';

const DiscordLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { email, password });
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundImage: 'linear-gradient(to bottom right, #090b29, #1A2081)',
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      color: 'white'
    },
    loginBox: {
      background: '#36393F',
      borderRadius: '8px',
      width: '600px',
      padding: '32px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
    },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '8px'
    },
    subheading: {
      fontSize: '16px',
      color: '#B9BBBE',
      textAlign: 'center',
      marginBottom: '24px'
    },
    label: {
      display: 'block',
      textTransform: 'uppercase',
      fontSize: '12px',
      fontWeight: 'bold',
      color: '#B9BBBE',
      marginBottom: '8px'
    },
    requiredStar: {
      color: '#ED4245'
    },
    input: {
      width: '100%',
      padding: '12px',
      borderRadius: '4px',
      background: '#202225',
      border: '1px solid #202225',
      color: 'white',
      fontSize: '16px',
      marginBottom: '16px',
      outline: 'none'
    },
    forgotPassword: {
      color: '#00AFF4',
      fontSize: '14px',
      textDecoration: 'none',
      display: 'block',
      marginBottom: '16px'
    },
    loginButton: {
      width: '100%',
      padding: '12px',
      background: '#5865F2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      marginBottom: '8px'
    },
    footer: {
      marginTop: '16px',
      fontSize: '14px',
      color: '#B9BBBE'
    },
    registerLink: {
      color: '#00AFF4',
      textDecoration: 'none',
      marginLeft: '4px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h1 style={styles.heading}>Welcome back!</h1>
        <p style={styles.subheading}>We're so excited to see you again!</p>
        
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>
            EMAIL OR PHONE NUMBER <span style={styles.requiredStar}>*</span>
          </label>
          <input
            type="text"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <label style={styles.label}>
            PASSWORD <span style={styles.requiredStar}>*</span>
          </label>
          <input
            type="password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <a href="#" style={styles.forgotPassword}>Forgot your password?</a>
          
          <button type="submit" style={styles.loginButton}>
            Log In
          </button>
        </form>
        
        <div style={styles.footer}>
          Need an account?
          <a href="/Register" style={styles.registerLink}>Register</a>
        </div>
      </div>
    </div>
  );
};

export default DiscordLoginPage;