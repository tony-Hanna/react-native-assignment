import { View, ScrollView, Pressable, Image, Alert } from "react-native"
import { CustomText } from "../../components/atoms/CustomText/CustomText"
import { InputWithLabel } from "../../components/molecules/InputWithLabel/InputWithLabel"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AddProductField, AddProductSchema } from "./AddProduct.type"
import { useTheme } from "../../store/themeContext"
import { createStyles } from "./AddProduct.style"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProduct } from "../../api/createProduct"
import { useEffect, useMemo, useState } from "react"
import LinearGradient from "react-native-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainStackParamList } from "../../navigation/stacks/types"
import { usePhotoStore } from "../../store/photoStore"
import { useLocationStore } from "../../store/LocationStore"
import { getAddressFromCoordinates } from "../../api/geocode"
import { ImageOptions } from "../../components/molecules/ImageOptions/ImageOptions"
import Toast from "react-native-toast-message"
import { Logo, LocationIcon, CameraIcon } from "../../assets/icons"
import Animated from 'react-native-reanimated'
import { useButtonAnimation } from '../../hooks/useButtonAnimation'
  
type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const AddProduct = () => {
    const insets = useSafeAreaInsets()
    const { theme, isDark } = useTheme()
    const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);
    const { animatedStyle, handlePressIn, handlePressOut } = useButtonAnimation();
    const [address, setAddress] = useState<string | null>(null)
    const navigation = useNavigation<NavigationProp>()
    const { productPhoto } = usePhotoStore()
    const { location, clearLocation } = useLocationStore()
    const queryClient = useQueryClient()
    const [selectedImages, setSelectedImages] = useState<{ uri: string; type: string; name: string }[]>([])
    const [showImageOptions, setShowImageOptions] = useState(false)
    const {
        control,
        handleSubmit,
        formState: { errors },
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
            reset({
                title: "",
                description: "",
                price: "",
            });
           setAddress('')
            clearLocation()
            setSelectedImages([])
            navigation.goBack()
        },
        onError: () => {
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

            <ScrollView 
                style={[styles.container, { paddingTop: insets.top}]} 
                contentContainerStyle={{ paddingBottom: 100, flexGrow: 1 }}
            >
           
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
                    <CustomText style={styles.address}>Address: {address}</CustomText>
                    {errors.location?.name && (
                        <CustomText style={styles.errorText}>
                            {errors.location.name.message}
                        </CustomText>
                    )}
                <Pressable 
                 style={[styles.buttonBase, styles.buttonSecondary]}
                    onPress={() => navigation.navigate('Location', {
                        latitude: 0,
                        longitude: 0
                    })}>
                <View style={styles.IconWrap}>
                    <LocationIcon color='#A1B2FD'/>
                    <CustomText style={styles.iconText}>Location</CustomText>
                  </View>
                    </Pressable>
                    
                    
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
                            <View style={styles.IconWrap}>
                                <CameraIcon color='#A1B2FD'/>
                                <CustomText style={styles.iconText}>
                                    {selectedImages.length >= 5
                                        ? "Maximum 5 images"
                                        : "Add Images"}
                                </CustomText>
                            </View>
                            
                        </Pressable>
                    </View>
                    
                    <Animated.View style={animatedStyle}>
                        <Pressable
                            style={[
                                styles.buttonBase,
                                styles.buttonPrimary,
                            ]}
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <CustomText style={styles.buttonText}>
                                {isPending ? "Creating..." : "Create Product"}
                            </CustomText>
                        </Pressable>
                    </Animated.View>
                </View>
            </ScrollView>
            {showImageOptions && (
                <ImageOptions 
                    showImageOptions={showImageOptions} 
                    setShowImageOptions={setShowImageOptions} 
                    setSelectedImages={setSelectedImages}
                    imageType="product"
                />
            )}

        </LinearGradient>
    )
}

export default AddProduct