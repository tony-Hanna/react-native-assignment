import { StyleSheet } from "react-native"
import { Theme } from "../../store/themeContext"
import { normalizeHeight, normalizeWidth } from "../../utils/scale"
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen');
console.log(SCREEN_WIDTH, SCREEN_HEIGHT)
export const createStyles = (theme: Theme, isDark: boolean, insets: { top: number; right: number; bottom: number; left: number }) =>
    StyleSheet.create({
      container: {
        flex: 1,
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
        display: 'flex',
        flexDirection: SCREEN_WIDTH < 375 ? 'row' : 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: normalizeHeight(8),
        marginTop: normalizeHeight(10),
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
        height: normalizeHeight(50),  
        borderWidth: normalizeWidth(1),      
        marginBottom: normalizeHeight(10),
        paddingHorizontal: normalizeWidth(10),
        borderRadius: normalizeWidth(8),
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
      },
      arrowContainer: {
        marginLeft: normalizeWidth(20),
        paddingTop: insets.top,
        marginBottom: normalizeHeight(28),
        width: 40,
        height: 40,
      
      }
    })