import React, { useState } from "react";

const PersonForm = ({
  onSubmit,
  newName,
  newNumber,
  nameChange,
  numberChange,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="input-block">
        <span className="input-label">Name:</span>
        <input
          id="nameInput"
          name="name"
          value={newName}
          onChange={nameChange}
          autoComplete="name"
        />
      </div>
      <div className="input-block">
        <span className="input-label">Number:</span>
        <input
          id="numberInput"
          name="number"
          value={newNumber}
          onChange={numberChange}
          autoComplete="tel"
        />
      </div>
      <div>
        <button className="input-button" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

export default PersonForm;
