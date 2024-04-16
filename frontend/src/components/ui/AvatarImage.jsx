// AvatarImage.jsx
import React from 'react';

const AvatarImage = ({ src, alt }) => {
  return (
    <img src={src} alt={alt} className="avatar-image" />
  );
}

export default AvatarImage;
