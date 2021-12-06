import PropTypes from 'prop-types';

import s from './ContactItem.module.css';

export default function ContactItem({ name, phoneNumber, onDeleteBtn }) {
  return (
    <li className={s.contactListItem}>
      <p>
        {name}: <span>{phoneNumber}</span>
      </p>
      <button
        className={s.deleteContactBtn}
        type="button"
        onClick={onDeleteBtn}
      >
        Delete
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  onDeleteBtn: PropTypes.func.isRequired,
};
