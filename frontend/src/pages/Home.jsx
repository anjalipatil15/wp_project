import "./Home.css"

const Home = () => {

  const servers = [
    { id: "1", name: "Gaming Server", icon: null },
    { id: "2", name: "Study Group", icon: null },
    { id: "3", name: "Project Team", icon: null },
  ]

  return (
    <div className="home">
      
      <div className="home__content">
        <div className="home__welcome">
          <h1>Welcome to Connectify</h1>
          <div className="home__features">
            <div className="home__feature">
              <div className="home__feature-icon">
              </div>
              <div className="home__feature-text">
                <h3>Create Servers</h3>
                <p>Create your own community with custom channels</p>
              </div>
            </div>
            <div className="home__feature">
              <div className="home__feature-icon">
                
              </div>
              <div className="home__feature-text">
                <h3>Voice Chat</h3>
                <p>Talk with friends in real-time voice channels</p>
              </div>
            </div>
            <div className="home__feature">
              <div className="home__feature-icon">
                
              </div>
              <div className="home__feature-text">
                <h3>Direct Messages</h3>
                <p>Chat privately with other users</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

