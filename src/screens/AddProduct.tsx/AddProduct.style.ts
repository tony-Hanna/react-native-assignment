import { StyleSheet } from "react-native"
import { Theme } from "../../store/themeContext"
import { normalizeWidth, normalizeHeight } from "../../utils/scale"

export const createStyles = (theme: Theme, isDark: boolean) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: normalizeWidth(20),
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: normalizeHeight(20),
        },
        title: {
            fontSize: normalizeWidth(24),
            fontWeight: "bold",
            color: theme.text,
        },
        form: {
            width: "100%",
        },
        input: {
            marginBottom: normalizeHeight(15),
        },
        errorText: {
            color: "red",
            fontSize: normalizeWidth(12),
            marginTop: normalizeHeight(-10),
            marginBottom: normalizeHeight(10),
        },
        button: {
            padding: normalizeWidth(15),
            borderRadius: normalizeWidth(10),
            alignItems: "center",
            marginTop: normalizeHeight(20),
        },
        buttonDisabled: {
            opacity: 0.5,
        },
        buttonText: {
            color: "#fff",
            fontSize: normalizeWidth(16),
            fontWeight: "bold",
        },
        imageSection: {
            marginTop: normalizeHeight(20),
        },
        sectionTitle: {
            fontSize: normalizeWidth(18),
            fontWeight: "600",
            color: theme.text,
            marginBottom: normalizeHeight(10),
        },
        imageList: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: normalizeWidth(10),
            marginBottom: normalizeHeight(10),
        },
        thumbnail: {
            width: normalizeWidth(80),
            height: normalizeWidth(80),
            borderRadius: normalizeWidth(8),
        },
        imageButton: {
            padding: normalizeWidth(10),
            borderRadius: normalizeWidth(8),
            alignItems: "center",
        },
        imageButtonText: {
            color: "#fff",
            fontSize: normalizeWidth(14),
        },
    }) 