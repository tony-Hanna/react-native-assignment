// CameraIcon.js
import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const CameraIcon = ({ size = 22, color = 'black' }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M4 7H6L7.5 4H16.5L18 7H20C21.1 7 22 7.9 22 9V19C22 20.1 21.1 21 20 21H4C2.9 21 2 20.1 2 19V9C2 7.9 2.9 7 4 7Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="14" r="3" stroke={color} strokeWidth="2" />
    </Svg>
  );
};

export default CameraIcon;
