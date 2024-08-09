import React from 'react';
import pic from '/src/assets/pic.png';
import './MainChatArea.css';

const UserInfo = ({ username }) => {
  return (
    <div>
      <div className="user-info-container">
        <div>
          <img src={pic} alt="" className="user-avatar" />
          <p>{username}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;