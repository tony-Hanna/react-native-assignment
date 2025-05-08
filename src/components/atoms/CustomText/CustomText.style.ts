import { StyleSheet } from "react-native";
import { Theme } from "../../../store/themeContext";
export const CustomTextStyles = (theme: Theme) => 
    StyleSheet.create({
    defaultText: {
      fontFamily: 'Roboto-Medium',
      color: theme.text
    },
  });
  