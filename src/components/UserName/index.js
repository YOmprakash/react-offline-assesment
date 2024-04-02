// username

import React, { useState } from "react";

import "./index.css";

const UserName = ({ onSubmit }) => {
  const [name, setName] = useState("");

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("userName", name);
    onSubmit(name);
  };

  return (
    <div className="user-name-container">
      <h1>Matching Game</h1>
      <form onSubmit={handleSubmit}>
        <h2>Enter your name</h2>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleChange}
          required
        />
        <button type="submit">Play</button>
      </form>
    </div>
  );
};

export default UserName;
