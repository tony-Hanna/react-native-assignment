import React from 'react';
import { Text, TextProps } from 'react-native';
import { CustomTextStyles } from './CustomText.style';
import { useTheme } from '../../../store/themeContext';
export const CustomText = ({ style, children, ...rest }: TextProps) => {
    const {theme} = useTheme()
    const styles = CustomTextStyles(theme)
  return (
    <Text style={[styles.defaultText, style]} {...rest}>
      {children}
    </Text>
  );
};

