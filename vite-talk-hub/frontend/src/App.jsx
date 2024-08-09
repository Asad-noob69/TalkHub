import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import ContactList from './components/leftside/ContactList.jsx';
import MessageList from './components/chatarea/MessageList.jsx';
import InputArea from './components/chatarea/InputArea.jsx';
import UserInfo from './components/chatarea/UserInfo.jsx';
import './App.css';

const socket = io('http://localhost:5000');

const App = () => {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages(prevMessages => [...prevMessages, msg]);
    });

    socket.on('userJoined', (user) => {
      setUsers(prevUsers => [...prevUsers, user]);
    });

    socket.on('userLeft', (user) => {
      setUsers(prevUsers => prevUsers.filter(u => u !== user));
    });

    return () => {
      socket.off('message');
      socket.off('userJoined');
      socket.off('userLeft');
    };
  }, []);

  const joinChat = () => {
    if (username.trim()) {
      socket.emit('join', username);
      setJoined(true);
    }
  };

  const sendMessage = (message) => {
    if (message.trim()) {
      const newMessage = { text: message, sender: username, timestamp: new Date().toISOString() };
      socket.emit('message', newMessage);
      setMessages(prevMessages => [...prevMessages, newMessage]);
    }
  };

  if (!joined) {
    return (
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
        />
        <button onClick={joinChat}>Join Chat</button>
      </div>
    );
  }

  return (
    <div className="container">
      <ContactList users={users} />
      <div className="main-chat-area">
        <UserInfo username={username} />
        <MessageList messages={messages} />
        <InputArea onSendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default App;