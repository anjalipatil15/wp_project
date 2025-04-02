import { Link } from "react-router-dom"
import "./ServerList.css"

const ServerList = ({ servers = [], activeServerId }) => {
  return (
    <div className="server-list">
      {servers.map((server) => (
        <Link key={server.ServerID} to={`/servers/${server.ServerID}`} className="server-item">
          <div className={`server-icon ${activeServerId === server.ServerID ? "active" : ""}`}>
            {server.ServerIcon ? (
              <img src={server.ServerIcon || "/placeholder.svg"} alt={server.ServerName} />
            ) : (
              <div className="server-acronym">
                {server.ServerName.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .substring(0, 2)}
              </div>
            )}
          </div>
          {activeServerId === server.ServerID && <div className="server-pill"></div>}
        </Link>
      ))}
    </div>
  )
}

export default ServerList

