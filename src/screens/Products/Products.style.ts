import { StyleSheet } from "react-native";
import { Theme } from "../../store/themeContext";

export const createStyles = (theme: Theme) => StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
    toggleButton: {
        padding: 10,
        backgroundColor: theme.text,
        borderRadius: 20,
        margin: 10,
        alignSelf: 'flex-end'
    },
    toggleText: {
        color: theme.background
    },
    text: {
        color: theme.text
    }
})