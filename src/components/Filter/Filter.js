import PropTypes from 'prop-types';

import s from './Filter.module.css';

export default function Filter({
  onFilterInputEnter,
  onFilterOut,
  filterValue,
}) {
  return (
    <label className={s.filterLabel}>
      Find contacts by name
      <input
        type="text"
        value={filterValue}
        className={s.filterInput}
        onChange={onFilterInputEnter}
        onBlur={onFilterOut}
      />
    </label>
  );
}

Filter.propTypes = {
  onFilterInputEnter: PropTypes.func.isRequired,
  onFilterOut: PropTypes.func.isRequired,
  filterValue: PropTypes.string.isRequired,
};
