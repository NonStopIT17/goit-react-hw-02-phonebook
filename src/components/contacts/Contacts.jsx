import React, { useState, useEffect } from "react";
import { ContactItem, DeleteButton, FilterForm } from "./Contacts.styled";
import PropTypes from "prop-types";

export const Filter = ({ setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <FilterForm>
      <label style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ marginBottom: "10px" }}>Find contacts by name</span>
        <input
          onChange={handleFilterChange}
          type="text"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        />
      </label>
    </FilterForm>
  );
};

Filter.propTypes = {
  setFilter: PropTypes.func.isRequired,
};

export const ContactList = ({ contacts, deleteContact }) => {
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    setFilteredContacts(contacts);
  }, [contacts]);

  return (
    <ul style={{ paddingLeft: "30px" }}>
      {filteredContacts.map((contact) => (
        <ContactItem key={contact.id}>
          <span style={{ marginRight: "10px" }}>
            {contact.name}: {contact.number}
          </span>
          <DeleteButton
            type="button"
            onClick={() => deleteContact(contact.id)}
          >
            Delete
          </DeleteButton>
        </ContactItem>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
