import { ContactItem, DeleteButton, FilterForm } from "./Contacts.styled"
import PropTypes from 'prop-types';

export const Filter = ({ setFilter}) => {
return (
    <FilterForm>
        <label style={{display:"flex", flexDirection: "column"}}>
            <span style={{marginBottom:"10px"}}>Find contacts by name</span>
            <input
                onChange={setFilter}
                type="text"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            />
        </label>
    </FilterForm>
)
}

export const ContactList = ({contacts, filter, deleteContact}) => {
    let contactsItems = [];
    !filter.length ? contactsItems = contacts 
    :contactsItems = contacts.filter(item => item.name.toLowerCase().includes(filter.toLowerCase()));
    return <ul style={{paddingLeft: "30px"}}>
         {contactsItems.map(contact => {
            return <ContactItem key={contact.id}>
                    <span style={{marginRight: "10px"}}>
                        {contact.name}: {contact.number} 
                    </span>
                    <DeleteButton type="button" id={contact.id} onClick={deleteContact}>Delete</DeleteButton>
                </ContactItem>
        })}
        </ul>
}

Filter.propTypes = {
    setFilter: PropTypes.func.isRequired,
}

ContactList.propTypes = {
    contacts: PropTypes.array.isRequired,
    filter: PropTypes.string,
    deleteContact: PropTypes.func.isRequired,
}