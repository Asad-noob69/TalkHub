import React from 'react';
import './ContactList.css';

const ContactItem = ({ contact }) => {
  return (
    <div className="contact-item">
      <img src={contact.avatar} alt="" className="avatar" />
      <div className="contact-info">
        <h3>{contact.name}</h3>
        <p>{contact.lastMessage}</p>
      </div>
    </div>
  );
};

export default ContactItem;