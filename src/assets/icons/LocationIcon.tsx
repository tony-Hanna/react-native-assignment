import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const LocationIcon = ({ size = 20, color = 'red' }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M12 2C8.13 2 5 5.13 5 9C5 13.25 9.25 19.16 11.05 21.62C11.56 22.31 12.44 22.31 12.95 21.62C14.75 19.16 19 13.25 19 9C19 5.13 15.87 2 12 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="9" r="2.5" fill={color} />
    </Svg>
  );
};

export default LocationIcon;
