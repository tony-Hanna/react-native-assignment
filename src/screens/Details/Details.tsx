import { Pressable, Text, View } from "react-native"
import { useRoute, RouteProp } from "@react-navigation/native"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { data } from "../../../Products.json"; 

type MainStackParamList = {
    Details: { id: string };
};

const Details = () => {
    const route = useRoute<RouteProp<MainStackParamList, 'Details'>>()
    const { id } = route.params
    const navigation = useNavigation<NativeStackNavigationProp<MainStackParamList>>()

    const product = data.find((item) => item._id === id)
    return(
        <View style={{marginTop: 20}}>
            <Pressable onPress={() => navigation.goBack()}>
                <Text>Back</Text>
                <Text>{product?.description}</Text>
            </Pressable>
            <Text>{id}</Text>
        </View>
    )
}
export {Details}