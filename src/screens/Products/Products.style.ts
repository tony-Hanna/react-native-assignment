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
    flatlist: { paddingBottom: 110 },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    searchContainer: {
        flexDirection: 'row',
        padding: 10,
        gap: 10,
        alignItems: 'center'
    },
    searchInput: {
        flex: 1,
        height: 40,
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)',
        borderRadius: 8,
        paddingHorizontal: 15,
        color: theme.text,
        fontSize: 16
    },
    sortButton: {
        backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        minWidth: 100,
        alignItems: 'center'
    },
    sortButtonText: {
        color: theme.text,
        fontSize: 14,
        fontWeight: '600'
    }
})