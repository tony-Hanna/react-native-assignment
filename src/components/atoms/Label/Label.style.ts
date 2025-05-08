import { StyleSheet } from "react-native";
import { Theme } from "../../../store/themeContext";
export const labelStyles = (theme: Theme) => 
    StyleSheet.create({
        label: {
            fontSize: 13,
            marginBottom: 4,
            color: theme.text,
            fontFamily: 'Roboto-Medium'
        },
        errorLabel: {
            color: "red",
        },
    })

    