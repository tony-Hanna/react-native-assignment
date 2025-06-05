import { StyleSheet } from "react-native"
import { normalizeHeight,normalizeWidth } from "../../../utils/scale"
export const refetchStyles = StyleSheet.create({

    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    arrowContainer: {
        position: 'absolute',
        top: normalizeHeight(20),
        left: normalizeWidth(7),
    },
    retryButton: {
        backgroundColor: '#2e8b57',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8
    },
    retryText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    },
    errorText: {
        color: 'red',
        fontSize: normalizeWidth(12),
        marginTop: normalizeHeight(-10),
        marginBottom: normalizeHeight(10),
      },
})