import { Component } from 'react';

import Form from './components/Form';
import Filter from './components/Filter';
import ContactList from './components/ContactList';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contactsData = localStorage.getItem('contacts');
    const savedContacts = JSON.parse(contactsData);
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  updateContactsList = obj => {
    this.setState(prevState => ({ contacts: [...prevState.contacts, obj] }));
  };

  updateFilter = event => {
    const filterValue = event.target.value;
    this.setState({ filter: filterValue });
  };

  resetFilter = event => {
    this.setState({ filter: '' });
  };

  findContactsByFilter = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.findContactsByFilter();

    return (
      <>
        <h1>Phonebook</h1>
        <Form
          addContact={this.updateContactsList}
          contacts={this.state.contacts}
        />

        <h2>Contacts</h2>
        <Filter
          onFilterInputEnter={this.updateFilter}
          onFilterOut={this.resetFilter}
          filterValue={filter}
        />

        <ContactList
          contactsData={filteredContacts}
          onDeleteBtn={this.deleteContact}
        />
      </>
    );
  }
}

export default App;
