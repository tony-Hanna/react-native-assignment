import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const DefaultProfileIcon = ({ size = 100 }: { size?: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <Circle cx="50" cy="50" r="50" fill="#ccc" />
      <Path
        d="M50 55c8.284 0 15-6.716 15-15S58.284 25 50 25 35 31.716 35 40s6.716 15 15 15z"
        fill="#fff"
      />
      <Path
        d="M25 80c0-11.046 8.954-20 20-20h10c11.046 0 20 8.954 20 20"
        fill="#fff"
      />
    </Svg>
  );
};

export default DefaultProfileIcon;
