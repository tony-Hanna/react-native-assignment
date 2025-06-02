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
            backgroundColor: "#2e8b57",
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
            backgroundColor: "#2e8b57",
        },
        imageButtonText: {
            color: "#fff",
            fontSize: normalizeWidth(14),
        },
        loadingContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        
        },
        thumbnailWrapper: {
            position: 'relative',
            marginRight: 10,
            marginBottom: 10,
          },
          imageThumbnail: {
            width: 100,
            height: 100,
            borderRadius: 8,
          },
          removeButton: {
            position: 'absolute',
            top: -5,
            right: -5,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: 10,
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          },
          removeButtonText: {
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
            lineHeight: 18,
          }
    })
