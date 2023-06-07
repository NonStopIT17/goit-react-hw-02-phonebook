import React, { Component } from "react";
import { ContactList, Filter } from "./contacts/Contacts";
import { GlobalStyle } from "./GlobalStyle.styled";
import { NewContactForm } from "./NewContactForm/NewContactForm";
import { v4 as uuidv4 } from 'uuid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  submitHandling = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    const isContactExists = this.state.contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactExists) {
      alert(`${name} is already in contacts`);
    } else {
      const newContact = {
        id: uuidv4(),
        name: name,
        number: number,
      };
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, newContact],
      }));
      form.reset();
    }
  };

  setFilter = (event) => {
    const inputText = event.currentTarget.value;
    this.setState({ filter: inputText });
  };

  deleteContact = (event) => {
    const targetId = event.currentTarget.id;
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((item) => item.id !== targetId),
    }));
  };

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <GlobalStyle />
        <div>
          <h1 style={{ marginBottom: "20px" }}>Phonebook</h1>
          <NewContactForm submitHandling={this.submitHandling} />

          <h2 style={{ marginBottom: "10px" }}>Contacts</h2>
          <Filter setFilter={this.setFilter} />
          <ContactList
            contacts={this.state.contacts}
            filter={this.state.filter}
            deleteContact={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}



