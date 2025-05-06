import { Image, View, Text, Pressable } from "react-native"
import { productProp } from "./Product.type"
import { createStyles } from "./Product.style"
import { useTheme } from "../../../store/themeContext"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type MainStackParamList = {
  Details: { id: string };
};

const Product = ({item}: {item: productProp}) => {
    const {theme} = useTheme()
    const styles = createStyles(theme)
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>()
    return (
        <Pressable onPress={() => navigation.navigate('Details', {id: item._id})}>
            <Text style={styles.text}>{item.title}</Text>
            <Image 
                source={{uri:item.images[0]?.url}}
                style={{height:200, width:200}}
            />
            <Text style={styles.text}>{item.price}</Text>
        </Pressable>
    )
}
export {Product}
