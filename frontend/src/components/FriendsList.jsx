import React, { useState, useEffect } from "react";
import "./FriendsList.css"; 

const FriendsList = () => {
    const [friends, setFriends] = useState([
        { name: "Alice", status: "online" },
        { name: "Mavis", status: "offline" },
        { name: "Robert", status: "dnd" }
    ]);

    const [pendingRequests, setPendingRequests] = useState([
        { name: "Charlie" },
        { name: "Lisa" }
    ]);

    
    const acceptRequest = (index) => {
        setFriends([...friends, { name: pendingRequests[index].name, status: "online" }]);
        setPendingRequests(pendingRequests.filter((_, i) => i !== index));
    };

    // Function to decline a friend request
    const declineRequest = (index) => {
        setPendingRequests(pendingRequests.filter((_, i) => i !== index));
    };

    // Function to remove a friend
    const removeFriend = (index) => {
        setFriends(friends.filter((_, i) => i !== index));
    };

    return (
        <div className="container">
            <h2>Friends</h2>
            <input type="text" className="search-bar" placeholder="Search friends..." />

            {/* Friends List */}
            <div className="friend-list">
                {friends.map((friend, index) => (
                    <div className="friend" key={index}>
                        <div>
                            <span className={`status ${friend.status}`}></span>
                            <span>{friend.name}</span>
                        </div>
                        <div className="buttons">
                            <button className="call">Call</button>
                            <button className="remove" onClick={() => removeFriend(index)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            <br />

            {/* Pending Requests */}
            <h2>Pending Requests (<span>{pendingRequests.length}</span>)</h2>
            <div className="friend-list">
                {pendingRequests.map((request, index) => (
                    <div className="friend" key={index}>
                        <div><span>{request.name}</span></div>
                        <div className="buttons">
                            <button className="add" onClick={() => acceptRequest(index)}>Accept</button>
                            <button className="remove" onClick={() => declineRequest(index)}>Decline</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FriendsList;


