import { Image, View, Pressable } from "react-native"
import { productProp } from "./Product.type"
import { createStyles } from "./Product.style"
import { useTheme } from "../../../store/themeContext"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { primary } from "../../../globalStyles/global.style"
import { CustomText } from "../../atoms/CustomText/CustomText"
import { MainStackParamList } from "../../../navigation/stacks/types"
import { memo, useMemo } from "react"
import Config from "react-native-config"

const Product = memo(({
    title,
    description,
    price,
    createdAt,
    images,
    _id
}: Pick<productProp, 'title' | 'description' | 'price' | 'createdAt' | 'images' | '_id'>) => {
    const { theme, isDark } = useTheme()
    
    // Memoize styles to prevent recalculation on every render
    const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark])
    
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>()

    // Memoize the formatted date
    const formattedDate = useMemo(() => {
        const date = new Date(createdAt);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
    }, [createdAt]);

    // Memoize the image URI to prevent string concatenation on every render
    const imageUri = useMemo(() => 
        `${Config.API_URL}${images[0]?.url}`, 
        [images]
    );

  
    const handlePress = () => {
        navigation.navigate('Details', { id: _id })
    }

    return (
        <Pressable style={[styles.card, primary.borderPrimary]} onPress={handlePress}>
            <View style={styles.imagePriceWrap}>
                <CustomText numberOfLines={2} ellipsizeMode="tail" style={styles.title}>
                    {title}
                </CustomText>
                <Image
                    source={{ uri: imageUri }}
                    style={[styles.image, primary.borderPrimary]}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.bottomRow}>
                <View>
                    <CustomText style={styles.price}>${price}</CustomText>
                    <CustomText numberOfLines={1} ellipsizeMode="tail" style={styles.details}>
                        {description}
                    </CustomText>
                </View>
                <CustomText style={styles.dateText}>
                    {formattedDate}
                </CustomText>
            </View>
        </Pressable>
    )
})

export { Product }
