import { StyleSheet } from 'react-native';
import { Theme } from '../../store/themeContext';
import { normalizeWidth, normalizeHeight } from '../../utils/scale';

export const createStyles = (theme: Theme, isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: normalizeWidth(20),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: normalizeHeight(20),
    },
    title: {
      fontSize: normalizeWidth(24),
      fontWeight: 'bold',
      color: theme.text,
    },
    logoutText: {
      color: theme.text,
      fontSize: normalizeWidth(16),
    },
    profileImageContainer: {
      alignItems: 'center',
      marginBottom: normalizeHeight(30),
    },
    profileImage: {
      width: normalizeWidth(120),
      height: normalizeWidth(120),
      borderRadius: normalizeWidth(60),
      marginBottom: normalizeHeight(10),
    },
    editImageButton: {
      padding: normalizeWidth(10),
    },
    editImageText: {
      color: theme.text,
      fontSize: normalizeWidth(16),
    },
    form: {
      width: '100%',
    },
    input: {
      marginBottom: normalizeHeight(15),
    },
    button: {
      padding: normalizeWidth(15),
      borderRadius: normalizeWidth(10),
      alignItems: 'center',
      marginTop: normalizeHeight(20),
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonText: {
      color: '#fff',
      fontSize: normalizeWidth(16),
      fontWeight: 'bold',
    },
    errorText: {
      color: 'red',
      fontSize: normalizeWidth(12),
      marginTop: normalizeHeight(-10),
      marginBottom: normalizeHeight(10),
    },
  }); 