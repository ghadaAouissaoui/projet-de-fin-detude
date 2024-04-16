// SelectContent.jsx
import React from 'react';

const SelectContent = ({ children, position }) => {
  return (
    <div className={`select-content ${position}`}>
      {children}
    </div>
  );
}

export default SelectContent;
