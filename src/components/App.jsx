import React, { Component } from "react";
import { ContactList } from "../components/contacts/Contacts";
import { GlobalStyle } from "./GlobalStyle.styled";
import NewContactForm from "./NewContactForm/NewContactForm";
import { v4 as uuidv4 } from "uuid";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [
        { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
        { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
        { id: "id-3", name: "Eden Clements", number: "645-17-79" },
        { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
      ],
    };
  }

  addContact = (contact) => {
    const { contacts } = this.state;

    const isContactExists = contacts.some(
      (existingContact) =>
        existingContact.name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isContactExists) {
      alert(`${contact.name} is already in contacts`);
    } else {
      const newContact = {
        id: uuidv4(),
        name: contact.name,
        number: contact.number,
      };

      this.setState((prevState) => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  deleteContact = (id) => {
    const { contacts } = this.state;
    const updatedContacts = contacts.filter((contact) => contact.id !== id);

    this.setState({
      contacts: updatedContacts,
    });
  };

  render() {
    const { contacts } = this.state;

    return (
      <div style={{ padding: "20px" }}>
        <GlobalStyle />
        <div>
          <h1 style={{ marginBottom: "20px" }}>Phonebook</h1>
          <NewContactForm addContact={this.addContact} />

          <h2 style={{ marginBottom: "10px" }}>Contacts</h2>
          <ContactList contacts={contacts} deleteContact={this.deleteContact} />
        </div>
      </div>
    );
  }
}

export default App;





