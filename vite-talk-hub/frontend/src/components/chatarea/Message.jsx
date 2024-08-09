import React from 'react';
import './MainChatArea.css';

const Message = ({ message }) => {
  // Make sure timestamp is a readable string
  const formattedTimestamp = message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : '';

  return (
    <div className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}>
      <div className="message-content">
        <p>{typeof message.text === 'string' ? message.text : JSON.stringify(message.text)}</p>
        <span className="timestamp">{formattedTimestamp}</span>
      </div>
      <div className="message-sender">{message.sender}</div>
    </div>
  );
};

export default Message;