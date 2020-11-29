import React from "react";
import PropTypes from "prop-types";
import s from "./Filter.module.css";

export default function Filter({ value, onChangeFilter }) {
  return (
    <div className={s.SearchForm}>
      <input
        type="text"
        className={s.SearchFormInput}
        value={value}
        onChange={(e) => onChangeFilter(e.target.value)}
        placeholder="Filter contacts here..."
      />
    </div>
  );
}

Filter.propTypes = {
  onChangeFilter: PropTypes.func,
  value: PropTypes.string,
};
