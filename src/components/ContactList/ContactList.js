import PropTypes from 'prop-types';

import ContactItem from '../ContactItem';
import s from './ContactList.module.css';

export default function ContactList({ contactsData, onDeleteBtn }) {
  return (
    <ul className={s.contactList}>
      {contactsData.map(({ id, name, number }) => (
        <ContactItem
          key={id}
          name={name}
          phoneNumber={number}
          onDeleteBtn={() => onDeleteBtn(id)}
        />
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contactsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onDeleteBtn: PropTypes.func.isRequired,
};
