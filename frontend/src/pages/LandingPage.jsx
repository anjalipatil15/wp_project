import React from 'react';

// CSS Styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#1e2233',
    backgroundImage: 'radial-gradient(#2a2d57 0%, #1e2233 100%)',
    position: 'relative',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    margin: 0,
    padding: 0,
    color: 'white',
    overflowX: 'hidden'
  },
  navbar: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 40px',
    maxWidth: '1280px',
    margin: '0 auto',
    width: '100%'
  },
  logo: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '24px',
    textDecoration: 'none'
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  navLink: {
    color: 'white',
    fontWeight: 600,
    textDecoration: 'none',
    fontSize: '16px'
  },
  loginButton: {
    backgroundColor: 'white',
    color: '#23272A',
    padding: '10px 16px',
    borderRadius: '40px',
    fontWeight: 500,
    fontSize: '14px',
    border: 'none',
    cursor: 'pointer'
  },
  heroSection: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '40px',
    maxWidth: '1280px',
    margin: '0 auto',
    alignItems: 'center',
    marginTop: '40px'
  },
  heroContent: {
    flex: '1',
    maxWidth: '600px',
    paddingRight: '20px',
    zIndex: '1'
  },
  heroImage: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '50%',
    zIndex: '1'
  },
  mainHeading: {
    fontSize: '64px',
    fontWeight: 800,
    lineHeight: '1.1',
    marginBottom: '24px',
    textTransform: 'uppercase'
  },
  subheading: {
    fontSize: '20px',
    lineHeight: '1.5',
    marginBottom: '40px'
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '400px'
  },
  discordApp: {
    width: '100%',
    maxWidth: '600px',
    height: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  characterImg: {
    position: 'absolute',
    height: '120px',
    width: 'auto'
  },
  leftCharacter: {
    bottom: '-40px',
    left: '0',
  },
  rightCharacter: {
    bottom: '-40px',
    right: '0',
  }
};

const DiscordLandingPage = () => {
  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <a href="#" style={styles.logo}>Discord</a>
        
        <button style={styles.loginButton}>Log In</button>
      </nav>
      
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={styles.mainHeading}>GROUP CHAT THAT'S ALL FUN & GAMES</h1>
          <p style={styles.subheading}>
            Discord is great for playing games and chilling with friends, or even building a worldwide community. Customize your own space to talk, play, and hang out.
          </p>
        </div>
        <div style={styles.heroImage}>
          <div style={styles.imageContainer}>
            <img 
              src="/api/placeholder/600/400" 
              alt="Discord App Interface" 
              style={styles.discordApp}
            />
            <img 
              src="/api/placeholder/120/120" 
              alt="Character" 
              style={{...styles.characterImg, ...styles.leftCharacter}}
            />
            <img 
              src="/api/placeholder/120/120" 
              alt="Character" 
              style={{...styles.characterImg, ...styles.rightCharacter}}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default DiscordLandingPage;