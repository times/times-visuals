// Library
import React from "react";
import Select from "react-select";

// Styles
import style from "./style.scss";

const ShowSelect = ({ show, onShowChange }) => (
  <Select
    className={style.Select}
    //clearable={false}
    //searchable={false}
    options={[5, 10, 20, 50].map(value => ({ value, label: value }))}
    value={{ value: show, label: show }}
    onChange={onShowChange}
  />
);

export default ShowSelect;
