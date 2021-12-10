import { Component } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

import s from './Form.module.css';

const initialState = {
  name: '',
  number: '',
};

export default class Form extends Component {
  nameID = shortid.generate();
  numberID = shortid.generate();

  static propTypes = {
    addContact: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }),
    ).isRequired,
  };

  state = initialState;

  updateState = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmitAddContact = event => {
    event.preventDefault();
    const { name, number } = this.state;
    const contactID = shortid.generate();
    const newContact = {
      id: contactID,
      name,
      number,
    };
    if (this.checkContactIdentity() === undefined) {
      this.props.addContact(newContact);
      this.reset();
    } else {
      this.alertIdentity(name);
    }
  };

  reset = () => {
    this.setState(initialState);
  };

  checkContactIdentity = () => {
    const identity = this.props.contacts.find(
      contact => contact.name.toLowerCase() === this.state.name.toLowerCase(),
    );
    return identity;
  };

  alertIdentity = name => {
    alert(`${name} is already in your contacts!`);
    this.reset();
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={s.form} onSubmit={this.onSubmitAddContact}>
        <label className={s.label} htmlFor={this.nameID}>
          Name
        </label>
        <input
          id={this.nameID}
          className={s.input}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={this.updateState}
        />
        <label className={s.label} htmlFor={this.numberID}>
          Number
        </label>
        <input
          id={this.numberID}
          className={s.input}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={this.updateState}
        />
        <button className={s.formBtn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
