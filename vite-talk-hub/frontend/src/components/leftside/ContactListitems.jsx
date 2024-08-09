import React from 'react';
import ContactItem from './ContactItem';
import './ContactList.css';
import pic from '/src/assets/pic.png';

const contacts = [
  { id: 1, name: 'Maria Nelson', lastMessage: 'looks good!', avatar: pic},
  { id: 2, name: 'Ashley Harris', lastMessage: 'okay cool', avatar: pic },
  { id: 3, name: 'Andrew Wilson', lastMessage: 'see you!', avatar: pic },
  // Add more contacts as needed
];

const ContactListitems = ({ searchQuery }) => {
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="contact-list">
      {filteredContacts.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </div>
  );
};

export default ContactListitems;

