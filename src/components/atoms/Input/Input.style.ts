import { StyleSheet } from "react-native";
import { Theme } from "../../../store/themeContext";
import { normalizeWidth, normalizeHeight } from "../../../utils/scale";

export const inputStyles = (theme: Theme) => 
  StyleSheet.create({
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      padding: normalizeWidth(8),
      borderRadius: normalizeWidth(16),
      marginBottom: normalizeHeight(12),
      color: theme.text,
      fontSize: normalizeWidth(16),
      borderWidth: normalizeWidth(1),
      borderColor: 'rgba(255, 255, 255, 0.3)',
      elevation: 0.5,
      fontFamily: 'Roboto-Regular',
    }
  });
