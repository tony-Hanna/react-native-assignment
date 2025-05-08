import { StyleSheet } from "react-native";
import { Theme } from "../../../store/themeContext";
export const passwordStyles = (theme: Theme) => 
  StyleSheet.create({
    inputWrapper: {
      position: "relative",
      width: "100%",
      marginBottom: 12,
    },
    input: {
      backgroundColor: "rgba(255, 255, 255, 0.25)",
      padding: 14,
      paddingRight: 40, // space for icon
      borderRadius: 10,
      color: theme.text,
      fontSize: 16,
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.3)",
      elevation: 0.5,
      fontFamily: 'Roboto-Regular'
    },
    icon: {
      position: "absolute",
      right: 10,
      top: 14,
    },
  })