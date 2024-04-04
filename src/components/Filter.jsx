import React, { useState, useEffect } from "react";

const Filter = ({ value, onChange }) => {
  return (
    <div className="input-block">
      <span className="input-label">Search:</span>
      <input
        id="filterInput"
        name="filter"
        type="text"
        onChange={onChange}
        value={value}
        placeholder="Search by name"
        autoComplete="name"
      />
    </div>
  );
};

export default Filter;
