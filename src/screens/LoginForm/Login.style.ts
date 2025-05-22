import { StyleSheet } from "react-native";
import { Theme } from "../../store/themeContext";
import { normalizeWidth, normalizeHeight } from "../../utils/scale";

export const createStyles = (theme: Theme, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'center',
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      marginHorizontal: normalizeWidth(20),
      padding: normalizeWidth(20),
      borderRadius: normalizeWidth(10),
      borderWidth: normalizeWidth(3),
      borderColor: 'rgba(255, 255, 255, 0.3)',
      elevation: 0.4,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: normalizeHeight(16),
      marginTop: normalizeHeight(30),
    },
    title: {
      fontSize: normalizeWidth(34),
      fontWeight: 'bold',
      marginBottom: normalizeHeight(16),
      textAlign: 'center',
      color: theme.text,
    },
    input: {
      height: normalizeHeight(48),
      borderWidth: 1,
      marginBottom: normalizeHeight(16),
      paddingHorizontal: normalizeWidth(12),
      borderRadius: normalizeWidth(10),
      
    },
    button: {
      height: normalizeHeight(52),
      borderRadius: normalizeWidth(10),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: normalizeHeight(16),
      width: normalizeWidth(290),
      alignSelf: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: normalizeWidth(18),
      fontWeight: 'bold',
      letterSpacing: normalizeWidth(1),
    },
    signupText: {
      textAlign: 'center',
      marginTop: normalizeHeight(16),
      color: theme.text,
    },
  });
