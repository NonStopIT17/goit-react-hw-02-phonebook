import React from "react";
import { ContactItem, DeleteButton } from "../contacts/Contacts.styled";
import PropTypes from "prop-types";
import Filter from "../filter/Filter";

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredContacts: [],
      filter: "",
    };
  }

  componentDidMount() {
    this.filterContacts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.contacts !== this.props.contacts ||
      prevState.filter !== this.state.filter
    ) {
      this.filterContacts();
    }
  }

  handleFilterChange = (value) => {
    this.setState({ filter: value });
  };

  filterContacts = () => {
    const { contacts } = this.props;
    const { filter } = this.state;
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    this.setState({ filteredContacts: filtered });
  };

  render() {
    const { filteredContacts } = this.state;
    const { deleteContact } = this.props;

    return (
      <div>
        <Filter setFilter={this.handleFilterChange} />
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
  }
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export { ContactList };
 





