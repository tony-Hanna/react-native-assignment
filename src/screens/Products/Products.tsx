import { View, Text, FlatList, Image, StyleSheet, Pressable } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {data} from '../../../Products.json' 
import { useTheme } from "../../store/themeContext"
import { createStyles } from "./Products.style"
import { productProp } from "../../components/organisms/Product/Product.type"
import {Product} from '../../components/organisms/Product/Product'
const Products = () => {
    const insets = useSafeAreaInsets()
    const {isDark, theme, toggleTheme} = useTheme()
    const styles = createStyles(theme)
    const renderItem = ({item} : {item: productProp}) => <Product item={item}/>
    return (
        <View style={[styles.container, {paddingTop : insets.top, paddingBottom: insets.bottom}]}>
            <Pressable style={styles.toggleButton} onPress={toggleTheme}>
                <Text style={styles.toggleText}>{isDark ? '🌞' : '🌙'}</Text>
            </Pressable>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

export {Products}