import { StyleSheet } from "react-native";
import { Theme } from "../../../store/themeContext";
import { normalizeWidth, normalizeHeight } from "../../../utils/scale";

export const passwordStyles = (theme: Theme) => 
  StyleSheet.create({
    inputWrapper: {
      position: "relative",
      width: "100%",
      marginBottom: normalizeHeight(8),
    },
    input: {
      backgroundColor: "rgba(255, 255, 255, 0.25)",
      padding: normalizeHeight(14),
      paddingRight: normalizeWidth(40), 
      borderRadius: normalizeWidth(10),
      color: theme.text,
      fontSize: normalizeWidth(16),
      borderWidth: 1,
      borderColor: "rgba(255, 255, 255, 0.3)",
      elevation: 0.5,
      fontFamily: 'Roboto-Regular',
      height: normalizeHeight(50),
    },
    icon: {
      position: "absolute",
      right: normalizeWidth(10),
      top: normalizeHeight(14),
    },
  });
