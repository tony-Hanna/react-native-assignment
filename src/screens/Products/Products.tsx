import { View, Text, FlatList, Pressable, StatusBar, Switch } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {data} from '../../../Products.json' 
import { useTheme } from "../../store/themeContext"
import { createStyles } from "./Products.style"
import { productProp } from "../../components/organisms/Product/Product.type"
import {Product} from '../../components/organisms/Product/Product'
import LinearGradient from "react-native-linear-gradient"
import { Logo } from "../../assets/Logo"
import { CustomText } from "../../components/atoms/CustomText/CustomText"
const Products = () => {
    const insets = useSafeAreaInsets()
    const {isDark, theme, toggleTheme} = useTheme()
    const styles = createStyles(theme, isDark)
    const renderItem = ({item} : {item: productProp}) => <Product item={item}/>
    return (
        <LinearGradient
            colors={theme.gradient} 
          >
        <StatusBar
              barStyle={isDark ? 'light-content' : 'dark-content'}
              backgroundColor="transparent"
              translucent
            />
            
        <View style={{paddingTop : insets.top, paddingBottom: insets.bottom}}>
            <View style={styles.header}>
                <View style={styles.logo}>
                    <Logo 
                        w={40}
                        h={40}
                    />
                    <CustomText style={{fontSize:20}}>Products</CustomText>
                </View>
            <Pressable style={styles.toggleButton} onPress={toggleTheme}>
                <Text style={styles.toggleText}>{isDark ? '🌞' : '🌙'}</Text>
            </Pressable>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.flatlist} 
            />
        </View>
        </LinearGradient>
    )
}

export {Products}