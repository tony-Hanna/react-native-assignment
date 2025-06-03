import { StyleSheet } from "react-native";
import { Theme } from "../../store/themeContext";
import { normalizeWidth, normalizeHeight } from "../../utils/scale"

export const createStyles = (theme: Theme, isDark: boolean) =>
     StyleSheet.create({
        container: {
            flex: 1,
        },
        logo: {display:'flex', flexDirection:'row', alignItems:'center', marginLeft:7},
        header: {display:'flex',flexDirection:'row', justifyContent:'space-between',marginTop:10 },
        cartList: {
            padding: normalizeWidth(15),
        },
        cartItem: {
            flexDirection: 'row',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.3)',
            borderRadius: 12,
            padding: normalizeWidth(15),
            marginBottom: normalizeHeight(15),
            alignItems: 'center',
        },
        itemImage: {
            width: normalizeWidth(80),
            height: normalizeWidth(80),
            borderRadius: 8,
            marginRight: normalizeWidth(15),
        },
        itemDetails: {
            flex: 1,
            justifyContent: 'space-between',
        },
        itemTitle: {
            fontSize: normalizeWidth(16),
            fontWeight: '600',
            marginBottom: normalizeHeight(5),
            color: theme.text,
        },
        itemPrice: {
            fontSize: normalizeWidth(16),
            color: '#2e8b57',
            fontWeight: '600',
            marginBottom: normalizeHeight(8),
        },
        quantityContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        quantityButton: {
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
            width: normalizeWidth(30),
            height: normalizeWidth(30),
            borderRadius: normalizeWidth(15),
            justifyContent: 'center',
            alignItems: 'center',
        },
        quantityButtonText: {
            fontSize: normalizeWidth(20),
            color: theme.text,
            fontWeight: '600',
        },
        quantityText: {
            fontSize: normalizeWidth(16),
            marginHorizontal: normalizeWidth(15),
            color: theme.text,
        },
        emptyCart: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        lottieAnimation: {
            width: normalizeWidth(200),
            height: normalizeWidth(200),
            marginBottom: normalizeHeight(20),
        },
        emptyCartText: {
            fontSize: normalizeWidth(18),
            color: theme.text,
        },
        footer: {
            padding: normalizeWidth(15),
            borderTopWidth: 1,
            borderTopColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            backgroundColor: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.5)',
        },
        totalContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: normalizeHeight(15),
        },
        totalText: {
            fontSize: normalizeWidth(18),
            fontWeight: '600',
            color: theme.text,
        },
        totalPrice: {
            fontSize: normalizeWidth(20),
            fontWeight: '700',
            color: '#2e8b57',
        },
        footerButtons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: normalizeWidth(10),
        },
        footerButton: {
            flex: 1,
            paddingVertical: normalizeHeight(12),
            borderRadius: 8,
            alignItems: 'center',
        },
        clearButton: {
            backgroundColor: '#ff4444',
        },
        checkoutButton: {
            backgroundColor: '#2e8b57',
        },
        footerButtonText: {
            color: '#fff',
            fontSize: normalizeWidth(16),
            fontWeight: '600',
        },
        deleteAction: {
            backgroundColor: '#ff4444',
            justifyContent: 'center',
            alignItems: 'center',
            width: normalizeWidth(80),
            height: '100%',
        },
        deleteButton: {
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
    })