// SelectTrigger.jsx
import React from 'react';

const SelectTrigger = ({ id, children }) => {
  return (
    <div id={id} className="select-trigger">
      {children}
    </div>
  );
}

export default SelectTrigger;
