import { View, Pressable } from "react-native"
import { CustomText } from "../../atoms/CustomText/CustomText"
import { refetchStyles as styles } from "./Refetch.styles"
import { RefetchProp } from "./Refetch.type"
export const Refetch = ({message, refetch}:RefetchProp) => {
    return (
        <View style={styles.errorContainer}>
            <CustomText style={styles.errorText}>Error loading products: {message}</CustomText>
            <Pressable 
                style={styles.retryButton} 
                onPress={() => refetch()}
            >
                <CustomText style={styles.retryText}>Try Again</CustomText>
            </Pressable>
        </View>
    )
}