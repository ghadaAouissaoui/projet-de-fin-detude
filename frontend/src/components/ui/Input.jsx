// Input.jsx
import React from 'react';

const Input = ({ id, type, placeholder }) => {
  return (
    <input id={id} type={type} placeholder={placeholder} className="input" />
  );
}

export default Input;
