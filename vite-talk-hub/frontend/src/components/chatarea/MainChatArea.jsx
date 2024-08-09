import React, { useState } from 'react';

const MainChatArea = ({ messages, sendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="main-chat-area">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.username ? `${msg.username}: ${msg.text}` : msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default MainChatArea;