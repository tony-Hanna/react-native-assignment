import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface EmailIconProps {
  size?: number;
  color?: string;
}

const EmailIcon: React.FC<EmailIconProps> = ({ size = 24, color = '#fff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2 4C1.45 4 1 4.45 1 5v14c0 .55.45 1 1 1h20c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1H2zm0 2h20v.01L12 13 2 6.01V6zm0 2.53L10.8 14c.77.6 1.63.6 2.4 0L22 8.53V19H2V8.53z"
      fill={color}
    />
  </Svg>
);

export default EmailIcon;
