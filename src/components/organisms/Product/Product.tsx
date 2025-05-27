import { Image, View, Pressable } from "react-native"
import { productProp } from "./Product.type"
import { createStyles } from "./Product.style"
import { useTheme } from "../../../store/themeContext"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { primary } from "../../../globalStyles/global.style"
import { CustomText } from "../../atoms/CustomText/CustomText"
import { MainStackParamList } from "../../../navigation/stacks/types"
import Config from "react-native-config"

const Product = ({ item }: { item: productProp }) => {
    const { theme, isDark } = useTheme()
    const styles = createStyles(theme, isDark)
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>()

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <Pressable style={[styles.card, primary.borderPrimary]} onPress={() => navigation.navigate('Details', { id: item._id })}>
            <View style={styles.imagePriceWrap}>
                <CustomText numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
                    {item.title}
                </CustomText>
                <Image
                    source={{ uri: `${Config.API_URL}${item.images[0]?.url}` }}
                    style={[styles.image, primary.borderPrimary]}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.bottomRow}>
                <View>
                    <CustomText style={styles.price}>${item.price}</CustomText>
                    <CustomText numberOfLines={1} ellipsizeMode="tail" style={styles.details}>
                        {item.description}
                    </CustomText>
                </View>
                <CustomText style={styles.dateText}>
                    {formatDate(item.createdAt)}
                </CustomText>
            </View>
        </Pressable>
    )
}

export { Product }
