import { StyleSheet } from "react-native"
import { Theme } from "../../../store/themeContext"
import { normalizeWidth, normalizeHeight } from "../../../utils/scale"
export const createStyles = (theme: Theme, isDark: boolean) =>
    StyleSheet.create({
        imagePriceWrap: {
          display: 'flex',  
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        },
        card: {
            backgroundColor: isDark?'rgba(255, 255, 255, 0.1)': 'rgba(255, 255, 255, 0.3)',
            padding: 15,
            margin: 15,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            boxShadow: isDark?'rgba(255, 255, 255, 0.66) 0px 3px 8px':'rgba(0, 0, 0, 0.24) 0px 3px 8px'
        },
        image: {
            width: normalizeWidth(150),
            height: normalizeHeight(150),
          },
        title: {
            fontSize: 20,
            fontWeight: '600',
            width: '50%',
            color: theme.text,
            marginBottom: 4,

        },
        details: {
            fontSize: 13,
            color: isDark?theme.text:'#777',
            marginBottom: 6,
            fontFamily: 'Roboto-Regular'
        },
        price: {
            fontSize: 18,
            color: '#2e8b57',
            fontWeight: 'bold',
        },
    })
