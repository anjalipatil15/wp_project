import React, { useState } from 'react';
import '../components/OnlineFriendsList.css'; 


const OnlineFriendsList = ({ friends }) => {

  const sampleFriends = [
    { id: 1, username: 'JohnDoe', status: 'Playing Valorant', isOnline: true, avatarUrl: null },
    { id: 2, username: 'AliceWonder', status: 'Online', isOnline: true, avatarUrl: null },
    { id: 3, username: 'BobSmith', status: 'In a meeting', isOnline: true, avatarUrl: null },
    { id: 4, username: 'EmilyTech', status: 'Coding', isOnline: true, avatarUrl: null },
    { id: 5, username: 'SamWilson', status: 'Offline', isOnline: false, avatarUrl: null },
    { id: 6, username: 'JennyLarson', status: 'Offline', isOnline: false, avatarUrl: null }
  ];

  const [displayFriends] = useState(friends || sampleFriends);
  
  // Filter online and offline friends
  const onlineFriends = displayFriends.filter(friend => friend.isOnline);
  const offlineFriends = displayFriends.filter(friend => !friend.isOnline);

  return (
    <div className="friends-sidebar">
      {/* Online Friends Section */}
      <div className="friends-header">
        <h3>ONLINE — {onlineFriends.length}</h3>
      </div>
      
      <div className="friends-list">
        {onlineFriends.map(friend => (
          <div key={friend.id} className="friend">
            <div className="friend-avatar"></div>
            <div className="friend-details">
              <div className="friend-name">
                <span className="status-indicator online"></span>
                {friend.username}
              </div>
              <div className="friend-status">{friend.status}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Offline Friends Section */}
      <div className="friends-header">
        <h3>OFFLINE — {offlineFriends.length}</h3>
      </div>
      
      <div className="friends-list">
        {offlineFriends.map(friend => (
          <div key={friend.id} className="friend">
            <div className="friend-avatar"></div>
            <div className="friend-details">
              <div className="friend-name">
                <span className="status-indicator offline"></span>
                {friend.username}
              </div>
              <div className="friend-status">{friend.status}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OnlineFriendsList;