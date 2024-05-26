import React from 'react';

const Separator = ({ style, ...props }) => {
  const defaultStyle = {
    height: '1px',
    width: '100%',
    backgroundColor: '#e0e0e0', // Default color for the separator
    margin: '16px 0', // Default margin
    ...style,
  };

  return (
    <div style={defaultStyle} {...props} />
  );
};

export default Separator;
