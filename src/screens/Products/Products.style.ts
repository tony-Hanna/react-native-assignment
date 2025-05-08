import { StyleSheet } from "react-native";
import { Theme } from "../../store/themeContext";

export const createStyles = (theme: Theme, isDark: boolean) => StyleSheet.create({
    toggleButton: {
        padding: 10,
        backgroundColor: theme.text,
        borderRadius: 20,
        margin: 10,
        marginRight: 14,
        alignSelf: 'flex-end'
    },
    toggleText: {
        color: theme.background
    },
    text: {
        color: theme.text
    },
    logo: {display:'flex', flexDirection:'row', alignItems:'center', marginLeft:7},
    header: {display:'flex',flexDirection:'row', justifyContent:'space-between'},
    flatlist: { paddingBottom: 110 }
})