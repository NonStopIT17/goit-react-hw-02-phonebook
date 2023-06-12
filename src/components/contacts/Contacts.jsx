import React, { useState, useEffect } from "react";
import { ContactItem, DeleteButton } from "../contacts/Contacts.styled";
import PropTypes from "prop-types";
import { Filter } from "../filter/Filter";

export const ContactList = ({ contacts, deleteContact }) => {
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [contacts, filter]);

  return (
    <div>
      <Filter setFilter={setFilter} />
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
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
