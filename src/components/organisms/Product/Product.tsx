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
import Animated, { ZoomIn } from 'react-native-reanimated';
import { formatRelativeTime } from "../../../utils/formatRelativeTime"

const Product = memo(({
    title,
    description,
    price,
    updatedAt,
    images,
    _id
}: Pick<productProp, 'title' | 'description' | 'price' | 'updatedAt' | 'images' | '_id'>) => {
    const { theme, isDark } = useTheme()
    
    // Memoize styles to prevent recalculation on every render
    const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark])
    
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>()


    const formattedDate = useMemo(() => {
        const date = new Date(updatedAt);
        return formatRelativeTime(date);
    }, [updatedAt]);


    const imageUri = useMemo(() => 
        `${Config.API_URL}${images[0]?.url}`, 
        [images]
    );

  
    const handlePress = () => {
        navigation.navigate('Details', { id: _id })
    }

    return (
        <Animated.View
            entering={ZoomIn.springify().mass(0.4).stiffness(20)} 
        >
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
        </Animated.View>
    )
})

export { Product }
