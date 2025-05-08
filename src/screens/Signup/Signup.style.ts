// import { StyleSheet } from "react-native"
// import { Theme } from "../../store/themeContext"
// import { normalizeHeight, normalizeWidth } from "../../utils/scale"
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
//         marginBottom: 16,
//         textAlign: 'center',
//         color: theme.text,
//         fontFamily: 'Roboto-Bold'
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
//       button: {
//         height: normalizeHeight(52),
//         borderRadius: normalizeWidth(10),
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginTop: normalizeHeight(16),
//         width: normalizeWidth(290),
//         alignSelf: 'center',
//       },
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
import { StyleSheet } from "react-native"
import { Theme } from "../../store/themeContext"
import { normalizeHeight, normalizeWidth } from "../../utils/scale"
export const createStyles = (theme: Theme, isDark: boolean) =>
    StyleSheet.create({
      container: {
        flex: 1,
        alignContent: 'center',
        
      },
      card: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginHorizontal: normalizeWidth(16),
        padding: normalizeWidth(14),
        borderRadius: normalizeWidth(10),
        borderWidth: normalizeWidth(3),
        borderColor: 'rgba(255, 255, 255, 0.3)',
        elevation: 0.4,
        width: '100%',
        maxWidth: normalizeWidth(340),
      },
      logoContainer: {
        alignItems: 'center',
        marginBottom: normalizeHeight(12),
        marginTop: normalizeHeight(24),
      },
      title: {
        fontSize: normalizeWidth(26),
        fontWeight: 'bold',
        marginBottom: normalizeHeight(10),
        textAlign: 'center',
        color: theme.text,
        fontFamily: 'Roboto-Bold'
      },
      input: {
        height: normalizeHeight(40),
        borderColor: '#ccc',   
        borderWidth: normalizeWidth(1),      
        marginBottom: normalizeHeight(10),
        paddingHorizontal: normalizeWidth(10),
        borderRadius: normalizeWidth(8),
        marginHorizontal: normalizeWidth(3),
      },
      button: {
        height: normalizeHeight(40),
        borderRadius: normalizeWidth(8),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normalizeHeight(10),
        width: normalizeWidth(310),
        alignSelf: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: normalizeWidth(15),
        fontWeight: 'bold',
        letterSpacing: normalizeWidth(1),
      },
      signupText: {
        textAlign: 'center',
        marginTop: normalizeHeight(10),
        color: theme.text
      }
    })