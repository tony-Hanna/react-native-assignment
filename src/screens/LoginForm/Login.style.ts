// import { StyleSheet } from "react-native"
// import { Theme } from "../../store/themeContext"
// export const createStyles = (theme: Theme, isDark: boolean) =>
//     StyleSheet.create({
//     container: {
//         flex: 1,
//         alignContent: 'center',
//         justifyContent: 'center',
//     },
//     card: { 
//         backgroundColor: 'rgba(255, 255, 255, 0.3)',
//         marginHorizontal: 20,
//         padding: 20,
//         borderRadius: 10,
//         borderWidth: 3,
//         borderColor: 'rgba(255, 255, 255, 0.3)', // subtle white borde
//         elevation: 0.4,
//       },
//     logoContainer: {
//         alignItems: 'center',
//         marginBottom: 16,
//         marginTop: 30,
//     },
//     title: {
//         fontSize: 34,
//         fontWeight: 'bold',
//         marginBottom: 16,
//         textAlign: 'center',
//         color: theme.text
//     },
//     input: {
//         height: 48,
//         borderColor: '#ccc',   
//         borderWidth: 1,      
//         marginBottom: 16,
//         paddingHorizontal: 12,
//         borderRadius: 10,
//         marginHorizontal: 5,
//       },
//     button: {
//         height: 48,
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: 16,
//         width:325,
//         alignSelf: 'center',
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: 'bold',
//         letterSpacing: 1,
//     },
//     signupText: {
//         textAlign: 'center',
//         marginTop: 16,
//         color: theme.text
//     }
// })
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
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: normalizeHeight(16),
      paddingHorizontal: normalizeWidth(12),
      borderRadius: normalizeWidth(10),
      marginHorizontal: normalizeWidth(5),
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
