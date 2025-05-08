import { StyleSheet } from "react-native";
import { Theme } from "../../store/themeContext";
export const verificationStyles = (theme: Theme) => 
    StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 20, marginBottom: 20, color: theme.text },
    inputsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '80%' },
    input: {
      borderBottomWidth: 2,
      borderColor: '#ccc',
      width: 50,
      fontSize: 24,
      textAlign: 'center',
      marginHorizontal: 5,
      color: theme.text,
    },
    button: {
      backgroundColor: '#2196F3',
      marginTop: 30,
      padding: 12,
      paddingHorizontal: 40,
      borderRadius: 6,
    },
    buttonText: { color: 'white', fontSize: 16 },
  });