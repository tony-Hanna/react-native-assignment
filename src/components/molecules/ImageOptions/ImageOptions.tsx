import { Pressable } from "react-native";
import { CustomText } from "../../atoms/CustomText/CustomText";
import { useTheme } from "../../../store/themeContext";
import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
  } from 'react-native-reanimated';
import { useEffect } from "react";
import { imageOptionsStyles } from "./ImageOptions.style";
import { launchImageLibrary } from "react-native-image-picker"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../../navigation/stacks/types";
type NavigationProp = NativeStackNavigationProp<MainStackParamList>;
export const ImageOptions = ({showImageOptions, setShowImageOptions, setSelectedImages, imageType}: {showImageOptions: boolean, setShowImageOptions: (showImageOptions: boolean) => void, setSelectedImages: any, imageType: 'profile' | 'product' | 'editProduct'}) => {
    const {theme, isDark} = useTheme()
    const modalTranslateY = useSharedValue(500);
    const overlayOpacity = useSharedValue(0);
    const styles = imageOptionsStyles(theme, isDark)
    const navigation = useNavigation<NavigationProp>()

    useEffect(() => {
        if (showImageOptions) {
          overlayOpacity.value = withTiming(1, { duration: 200 });
          modalTranslateY.value = withSpring(0, {
            damping: 7,
            stiffness: 120,
          });
        } else {
          overlayOpacity.value = withTiming(0, { duration: 200 });
          modalTranslateY.value = withTiming(500, { duration: 200 });
        }
      }, [showImageOptions]);
      const animatedOverlayStyle = useAnimatedStyle(() => ({
        opacity: overlayOpacity.value,
      }));
      
      const animatedModalStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: modalTranslateY.value }],
      }));

      const handleImagePicker = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: "photo",
                quality: 0.8,
                selectionLimit: 5,
            })

            if (result.assets && result.assets.length > 0) {
                const newImages = result.assets.map((asset) => ({
                    uri: asset.uri!,
                    type: asset.type || "image/jpeg",
                    name: asset.fileName || "image.jpg",
                }))
                setSelectedImages((prev: any) => [...prev, ...newImages].slice(0, 5))
            }
        } catch (error) {
            console.error("Error picking images:", error)
            Alert.alert("Error", "Failed to pick images. Please try again.")
        }
    }
    return (
        <Animated.View style={[styles.modalOverlay, animatedOverlayStyle]}>
    <Pressable
      style={{ flex: 1, width: '100%', height: '100%' }}
      onPress={() => setShowImageOptions(false)}
    >
      <Animated.View
        style={[styles.modalContent, animatedModalStyle]}
        onStartShouldSetResponder={() => true}
      >
        <CustomText style={styles.modalTitle}>Select Image Option</CustomText>

        <Pressable
          style={styles.modalButton}
          onPress={() => {
            setShowImageOptions(false);
            handleImagePicker();
          }}
        >
          <CustomText style={styles.modalButtonText}>Choose from Gallery</CustomText>
        </Pressable>

        <Pressable
          style={styles.modalButton}
          onPress={() => {
            setShowImageOptions(false);
            navigation.navigate('CameraScreen', {
              type: imageType
            });
          }}
        >
          <CustomText style={styles.modalButtonText}>Take a Picture</CustomText>
        </Pressable>

        <Pressable onPress={() => setShowImageOptions(false)}>
          <CustomText style={styles.cancelText}>Cancel</CustomText>
        </Pressable>
      </Animated.View>
    </Pressable>
  </Animated.View>
    )
}