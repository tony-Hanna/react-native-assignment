import { Image, View,  Pressable } from "react-native"
import { productProp } from "./Product.type"
import { createStyles } from "./Product.style"
import { useTheme } from "../../../store/themeContext"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { primary } from "../../../globalStyles/global.style"
import { CustomText } from "../../atoms/CustomText/CustomText"
import { MainStackParamList } from "../../../navigation/stacks/types"

const Product = ({ item }: { item: productProp }) => {
    const { theme, isDark } = useTheme()
    const styles = createStyles(theme, isDark)
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>()
 

    return (
        <Pressable style={[styles.card, primary.borderPrimary]} onPress={() => navigation.navigate('Details', { id: item._id })}>
            <View style={styles.imagePriceWrap}>
            <CustomText numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
                {item.title}
            </CustomText>
            <Image
                source={{ uri: `https://backend-practice.eurisko.me${item.images[0]?.url}` }}
                style={[styles.image, primary.borderPrimary]}
                resizeMode="contain"
            />
            </View>
            <CustomText style={styles.price}>${item.price}</CustomText>
            
            <CustomText numberOfLines={1} ellipsizeMode="tail" style={styles.details}>
                {item.description}
            </CustomText>
        </Pressable>
    )
}

export { Product }
