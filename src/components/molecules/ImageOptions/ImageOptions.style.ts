import { StyleSheet } from "react-native";
import { Theme } from "../../../store/themeContext";

export const imageOptionsStyles = (theme: Theme, isDark: boolean) =>
    StyleSheet.create({
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
    })