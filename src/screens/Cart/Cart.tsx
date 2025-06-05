import React, { useCallback, useMemo } from 'react';
import { View, FlatList, Pressable, Image } from "react-native";
import { CustomText } from "../../components/atoms/CustomText/CustomText";
import LinearGradient from "react-native-linear-gradient";
import { useTheme } from "../../store/themeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Logo } from "../../assets/icons";
import { createStyles } from "./Cart.style";
import { useCartStore } from "../../store/CartStore";
import Config from "react-native-config";
import Toast from "react-native-toast-message";
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { CartItem } from "./Cart.type";
import LottieView from 'lottie-react-native';
import { RightAction } from '../../components/molecules/RightAction/RightAction';

const Cart: React.FC = () => {
    const { theme, isDark } = useTheme();
    const insets = useSafeAreaInsets();
    const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);

    const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();

    const handleUpdateQuantity = useCallback((itemId: string, newQuantity: number) => {
        updateQuantity(itemId, newQuantity);
    }, [updateQuantity]);

    const handleRemoveItem = useCallback((itemId: string) => {
        removeItem(itemId);
        Toast.show({
            type: 'success',
            text1: 'Item removed from cart',
        });
    }, [removeItem]);

    const handleClearCart = useCallback(() => {
        clearCart();
        Toast.show({
            type: 'success',
            text1: 'Cart cleared',
        });
    }, [clearCart]);

    const renderItem = useCallback(({ item }: { item: CartItem }) => (
        <ReanimatedSwipeable
            friction={2}
            enableTrackpadTwoFingerGesture
            rightThreshold={40}
            renderRightActions={(progress, dragX) => (
                <RightAction
                    progress={progress}
                    dragX={dragX}
                    onDelete={() => handleRemoveItem(item._id)}
                />
            )}
        >
            <View style={styles.cartItem}>
                {item.images && item.images[0] && (
                    <Image
                        source={{ uri: `${Config.API_URL}${item.images[0].url}` }}
                        style={styles.itemImage}
                        resizeMode="contain"
                    />
                )}
                <View style={styles.itemDetails}>
                    <CustomText style={styles.itemTitle} numberOfLines={2}>
                        {item.title}
                    </CustomText>
                    <CustomText style={styles.itemPrice}>
                        ${item.price}
                    </CustomText>
                    <View style={styles.quantityContainer}>
                        <Pressable
                            style={[
                                styles.quantityButton,
                                item.quantity <= 1 && styles.disabledButton
                            ]}
                            onPress={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                        >
                            <CustomText style={[
                                styles.quantityButtonText,
                                item.quantity <= 1 && styles.disabledButtonText
                            ]}>-</CustomText>
                        </Pressable>
                        <CustomText style={styles.quantityText}>
                            {item.quantity}
                        </CustomText>
                        <Pressable
                            style={styles.quantityButton}
                            onPress={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                        >
                            <CustomText style={styles.quantityButtonText}>+</CustomText>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ReanimatedSwipeable>
    ), [handleRemoveItem, handleUpdateQuantity, styles]);

    return (
        <LinearGradient colors={theme.gradient} style={{ flex: 1 }}>
            <View style={[styles.header, { paddingTop: insets.top, paddingBottom: 25 }]}>
                <View style={styles.logo}>
                    <Logo w={40} h={40} />
                    <CustomText style={{ fontSize: 20 }}>Shopping Cart</CustomText>
                </View>
            </View>

            {items.length === 0 ? (
                <View style={styles.emptyCart}>
                    <LottieView
                        source={require('../../assets/lottie/emptyCart.json')}
                        autoPlay
                        loop
                        style={styles.lottieAnimation}
                    />
                    <CustomText style={styles.emptyCartText}>
                        Your cart is empty
                    </CustomText>
                </View>
            ) : (
                <>
                    <FlatList
                        data={items}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                        contentContainerStyle={styles.cartList}
                    />
                    <View style={styles.footer}>
                        <View style={styles.totalContainer}>
                            <CustomText style={styles.totalText}>Total:</CustomText>
                            <CustomText style={styles.totalPrice}>
                                ${getTotalPrice().toFixed(2)}
                            </CustomText>
                        </View>
                        <View style={styles.footerButtons}>
                            <Pressable
                                style={[styles.footerButton, styles.clearButton]}
                                onPress={handleClearCart}
                            >
                                <CustomText style={styles.footerButtonText}>
                                    Clear Cart
                                </CustomText>
                            </Pressable>
                            <Pressable
                                style={[styles.footerButton, styles.checkoutButton]}
                                onPress={() => {
                                    // Implement checkout functionality
                                    Toast.show({
                                        type: 'info',
                                        text1: 'Checkout functionality coming soon!',
                                    });
                                }}
                            >
                                <CustomText style={styles.footerButtonText}>
                                    Checkout
                                </CustomText>
                            </Pressable>
                        </View>
                    </View>
                </>
            )}
        </LinearGradient>
    );
};

export { Cart };