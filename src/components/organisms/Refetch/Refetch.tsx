import { View, Pressable } from "react-native"
import { CustomText } from "../../atoms/CustomText/CustomText"
import { refetchStyles as styles } from "./Refetch.styles"
import { RefetchProp } from "./Refetch.type"
import { ArrowLeftIcon } from "../../../assets/icons"
export const Refetch = ({message, refetch}:RefetchProp) => {
    return (
        <View style={styles.errorContainer}>
            <View style={styles.arrowContainer}>
                <ArrowLeftIcon />
            </View>
            <CustomText style={styles.errorText}>Error loading: {message}</CustomText>
            <Pressable 
                style={styles.retryButton} 
                onPress={() => refetch()}
            >
                <CustomText style={styles.retryText}>Try Again</CustomText>
            </Pressable>
        </View>
    )
}