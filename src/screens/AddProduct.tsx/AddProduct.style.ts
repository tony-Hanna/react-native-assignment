import { StyleSheet } from "react-native"
import { Theme } from "../../store/themeContext"
import { normalizeWidth, normalizeHeight } from "../../utils/scale"

export const createStyles = (theme: Theme, isDark: boolean) =>
    StyleSheet.create({
        container: {
            flex: 1,
            padding: normalizeWidth(20),
            position: 'relative',
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
            color: theme.text,
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
            color: theme.text,
            fontSize: normalizeWidth(14),
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
          },
          modalOverlay: {
            position: 'absolute',
            top: 0,
            left:0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            elevation: 5,
          },
          modalContent: {
            width: '80%',
            backgroundColor: theme.background,
            borderRadius: 12,
            padding: 20,
            alignItems: 'center',
            elevation: 6,
            alignSelf: 'center',
            marginTop: 'auto',
            marginBottom: 'auto',
          },
          modalTitle: {
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 16,
            color: theme.text,
          },
          modalButton: {
            width: '100%',
            backgroundColor: theme.background,
            borderRadius: 8,
            paddingVertical: 12,
            marginVertical: 8,
            alignItems: 'center',
          },
          modalButtonText: {
            color: theme.text,
            fontWeight: '500',
            fontSize: 16,
          },
          cancelText: {
            color: theme.text,
            marginTop: 10,
            fontSize: 16,
          },
          buttonBase: {
            paddingVertical: 14,
            paddingHorizontal: 20,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 3,
          },
          
          buttonPrimary: {
            backgroundColor: '#4a90e2',
          },
          
          buttonSecondary: {
            backgroundColor: '#f0f0f0',
          },
          
          buttonTextPrimary: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
          },
          
          buttonTextSecondary: {
            color: '#333',
            fontSize: 16,
            fontWeight: '500',
          },
          
          
    }) 