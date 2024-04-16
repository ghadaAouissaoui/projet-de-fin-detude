// Button.jsx
import React from 'react';

const Button = ({ children, className, variant }) => {
  return (
    <button className={`button ${variant} ${className}`}>
      {children}
    </button>
  );
}

export default Button;
