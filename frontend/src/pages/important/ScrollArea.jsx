import React from 'react';

const ScrollArea = ({ children, style, ...props }) => {
  const defaultStyle = {
    overflowY: 'auto',
    maxHeight: '500px', // Set a default max height or pass it as a prop
    ...style,
  };

  return (
    <div style={defaultStyle} {...props}>
      {children}
    </div>
  );
};

export default ScrollArea;
