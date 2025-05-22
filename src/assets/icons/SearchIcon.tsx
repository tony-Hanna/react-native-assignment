import React from 'react';
import Svg, { Circle, Line } from 'react-native-svg';
import { ViewStyle } from 'react-native';

type Props = {
  size?: number;
  color?: string;
  style?: ViewStyle;
};

const SearchIcon: React.FC<Props> = ({ size = 24, color = '#888', style }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2" />
      <Line x1="16.65" y1="16.65" x2="21" y2="21" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </Svg>
  );
};

export default SearchIcon;
