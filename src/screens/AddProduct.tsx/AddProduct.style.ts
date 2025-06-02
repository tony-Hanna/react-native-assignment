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
       
        logo: {display:'flex', flexDirection:'row', alignItems:'center', marginLeft:7},
        header: {display:'flex',flexDirection:'row', justifyContent:'space-between',marginTop:15 },
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
            color: 'black',
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