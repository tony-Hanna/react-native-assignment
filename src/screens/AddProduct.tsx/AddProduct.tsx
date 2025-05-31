import { View, ScrollView, Pressable, Image, Alert, ActivityIndicator,Text } from "react-native"
import { CustomText } from "../../components/atoms/CustomText/CustomText"
import { InputWithLabel } from "../../components/molecules/InputWithLabel/InputWithLabel"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AddProductField, AddProductSchema } from "./AddProduct.type"
import { useTheme } from "../../store/themeContext"
import { createStyles } from "./AddProduct.style"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProduct } from "../../api/createProduct"
import { useEffect, useState } from "react"
import { launchImageLibrary } from "react-native-image-picker"
import LinearGradient from "react-native-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainStackParamList } from "../../navigation/stacks/types"
import { usePhotoStore } from "../../store/photoStore"
import { useLocationStore } from "../../store/LocationStore"
import { getAddressFromCoordinates } from "../../api/geocode"

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
  } from 'react-native-reanimated';
import Toast from "react-native-toast-message"
import { Logo } from "../../assets/icons/Logo"
import Config from "react-native-config"
  
type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const AddProduct = () => {
    console.log(Config.APP_ID)
    console.log(Config.API_KEY)
    const modalTranslateY = useSharedValue(500);
    const overlayOpacity = useSharedValue(0);
    const insets = useSafeAreaInsets()
    const { theme, isDark } = useTheme()
    const styles = createStyles(theme, isDark)
    const [address, setAddress] = useState<string | null>(null)
    const navigation = useNavigation<NavigationProp>()
    const { productPhoto } = usePhotoStore()
    const { location } = useLocationStore()
    const queryClient = useQueryClient()
    const [selectedImages, setSelectedImages] = useState<{ uri: string; type: string; name: string }[]>([])
    const [showImageOptions, setShowImageOptions] = useState(false)
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset
    } = useForm<AddProductField>({
        resolver: zodResolver(AddProductSchema),
        defaultValues: {
            title: "",
            description: "",
            price: "",
            location: {
                name: address || '',
                longitude: location?.longitude,
                latitude: location?.latitude,
            },
        },
    })
   
    const { mutate, isPending } = useMutation({
        mutationFn: async (data: AddProductField) => {
          const formData = new FormData();
          formData.append('title', data.title);
          formData.append('description', data.description);
          formData.append('price', data.price);
          formData.append('location', JSON.stringify({
            name: address || '',
            longitude: location?.longitude,
            latitude: location?.latitude
          }));
          
          selectedImages.forEach((image, index) => {
            formData.append('images', {
              uri: image.uri,
              type: image.type,
              name: image.name,
            });
          });
          return createProduct(formData);  
        },
        onSuccess: (data) => {
            Toast.show({
                type: 'success',
                text1: 'product created successfully',
              });
            queryClient.invalidateQueries({ queryKey: ['products']})
            reset()
            setSelectedImages([])
            navigation.goBack()
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'error creating product',
              });
        },
    })
    useEffect(() => {
        if (location) {
            getAddressFromCoordinates(location.latitude, location.longitude).then((data) => {
                setAddress(data.display_name);
                reset((prev) => ({
                    ...prev,
                    location: {
                        name: data.display_name,
                        longitude: location.longitude,
                        latitude: location.latitude,
                    },
                }));
            });
        }
    }, [location]);
    
    useEffect(() => {
        if (productPhoto) {
            const imageObject = {
                uri: productPhoto,
                type: 'image/jpeg', 
                name: 'camera_photo.jpg', 
            };
            setSelectedImages((prev) => [...prev, imageObject].slice(0, 5));
        }
    }, [productPhoto]);
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
                setSelectedImages((prev) => [...prev, ...newImages].slice(0, 5))
            }
        } catch (error) {
            console.error("Error picking images:", error)
            Alert.alert("Error", "Failed to pick images. Please try again.")
        }
    }
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
            
    const onSubmit = (data: AddProductField) => {
        if (selectedImages.length === 0) {
            Alert.alert("Error", "Please select at least one image")
            return
        }
        mutate(data)
    }
   
    return (
        <LinearGradient colors={theme.gradient} style={{ flex: 1 }}>
             <View style={[styles.header, {paddingTop : insets.top, paddingBottom: 25}]}>
                    <View style={styles.logo}>
                        <Logo 
                            w={40}
                            h={40}
                        />
                        <CustomText style={{fontSize:20}}>Create Product</CustomText>
                    </View>

                  
                </View>

            <ScrollView style={[styles.container, { paddingTop: insets.top, paddingBottom: 25 }]}>
           
                <View style={styles.form}>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <InputWithLabel
                                {...field}
                                label="Title"
                                style={styles.input}
                            />
                        )}
                    />
                    {errors.title && (
                        <CustomText style={styles.errorText}>
                            {errors.title.message}
                        </CustomText>
                    )}

                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <InputWithLabel
                                {...field}
                                label="Description"
                                style={styles.input}
                                multiline
                                numberOfLines={4}
                            />
                        )}
                    />
                    {errors.description && (
                        <CustomText style={styles.errorText}>
                            {errors.description.message}
                        </CustomText>
                    )}

                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                            <InputWithLabel
                                {...field}
                                label="Price"
                                style={styles.input}
                                keyboardType="numeric"
                            />
                        )}
                    />
                    {errors.price && (
                        <CustomText style={styles.errorText}>
                            {errors.price.message}
                        </CustomText>
                    )}
                    <CustomText>Address: {address}</CustomText>
                <Pressable 
                 style={[styles.buttonBase, styles.buttonSecondary]}
                    onPress={() => navigation.navigate('Location', {
                        latitude: 0,
                        longitude: 0
                    })}>
                        <CustomText style={styles.imageButtonText}>Location</CustomText>
                    </Pressable>
                    {errors.location?.name && (
                        <CustomText style={styles.errorText}>
                            {errors.location.name.message}
                        </CustomText>
                    )}
                    
                    <View style={styles.imageSection}>
                
                        <View style={styles.imageList}>
                            {selectedImages.map((image, index) => (
                            <View key={index} style={styles.thumbnailWrapper}>
                                <Image source={{ uri: image.uri }} style={styles.imageThumbnail} />
                                <Pressable
                                style={styles.removeButton}
                                onPress={() =>
                                    setSelectedImages(prev => prev.filter((_, i) => i !== index))
                                }
                                >
                                <CustomText style={styles.removeButtonText}>×</CustomText>
                                </Pressable>
                            </View>
                            ))}
                        </View>
                        <Pressable
                            style={[
                                styles.buttonBase,
                                selectedImages.length >= 5 ? styles.buttonDisabled : styles.buttonSecondary,
                              ]}
                            onPress={() => setShowImageOptions(true)}
                            disabled={selectedImages.length >= 5}
                        >
                            <CustomText style={styles.imageButtonText}>
                                {selectedImages.length >= 5
                                    ? "Maximum 5 images"
                                    : "Add Images"}
                            </CustomText>
                        </Pressable>
                    </View>
                    
                    <Pressable
                        style={[
                            styles.buttonBase,
                            isValid ? styles.buttonPrimary : styles.buttonDisabled,
                          ]}
                        onPress={handleSubmit(onSubmit)}
                        disabled={!isValid || isPending}
                    >
                        <CustomText style={styles.buttonText}>
                            {isPending ? "Creating..." : "Create Product"}
                        </CustomText>
                    </Pressable>
                </View>
            </ScrollView>
            {showImageOptions && (
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
              type: 'product'
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
)}

        </LinearGradient>
    )
}

export default AddProduct