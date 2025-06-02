// CartIcon.js
import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const CartIcon = ({ size = 23, color = '#fff' }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M3 3H5L6.68 14.39C6.84 15.49 7.76 16.32 8.87 16.32H18.6C19.61 16.32 20.49 15.61 20.7 14.62L22 8H6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="9" cy="20" r="1.5" fill={color} />
      <Circle cx="18" cy="20" r="1.5" fill={color} />
    </Svg>
  );
};

export default CartIcon;
