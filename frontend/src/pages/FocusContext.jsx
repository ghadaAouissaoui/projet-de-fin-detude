// FocusContext.js
import React, { createContext, useContext, useState } from 'react';

const FocusContext = createContext();

export const useFocus = () => {
  return useContext(FocusContext);
};

export const FocusProvider = ({ children }) => {
  const [focusTarget, setFocusTarget] = useState(null);

  return (
    <FocusContext.Provider value={{ focusTarget, setFocusTarget }}>
      {children}
    </FocusContext.Provider>
  );
};
