import React from 'react';
import Svg, { Path } from 'react-native-svg';

const AlertTriangleIcon = ({ size = 20, color = 'red' }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M12 9v3.75" />
    <Path d="M2.697 16.126c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126Z" />
    <Path d="M12 15.75h.007v.008H12v-.008Z" />
  </Svg>
);

export default AlertTriangleIcon;
