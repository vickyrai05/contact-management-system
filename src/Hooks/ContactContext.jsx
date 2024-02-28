import React, { createContext, useContext, useState } from 'react';

const ContactContext = createContext();

export const useContactContext = () => {
  return useContext(ContactContext);
};

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const addContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };
  const deleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId));

  };
  const editContact = (editedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === editedContact.id ? { ...contact, ...editedContact } : contact
      )
    );
  };
  return (
    <ContactContext.Provider value={{ contacts, addContact,deleteContact,editContact}}>
      {children}
    </ContactContext.Provider>
  );
};
