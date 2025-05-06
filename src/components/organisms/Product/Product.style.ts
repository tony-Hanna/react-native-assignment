import { StyleSheet } from "react-native";
import { Theme } from "../../../store/themeContext";

export const createStyles = (theme: Theme) => StyleSheet.create({
    text: {
        color: theme.text
    }
})