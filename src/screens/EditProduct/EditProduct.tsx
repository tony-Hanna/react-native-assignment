import { View, ScrollView, Pressable, Image, Alert, ActivityIndicator } from "react-native"
import { CustomText } from "../../components/atoms/CustomText/CustomText"
import { InputWithLabel } from "../../components/molecules/InputWithLabel/InputWithLabel"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { EditProductField, EditProductSchema } from "./EditProduct.type"
import { useTheme } from "../../store/themeContext"
import { createStyles } from "./EditProduct.style"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { updateProduct } from "../../api/updateProduct"
import { getProduct } from "../../api/getProduct"
import { useState, useEffect } from "react"
import { launchImageLibrary } from "react-native-image-picker"
import LinearGradient from "react-native-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native"
import ArrowLeftIcon from "../../assets/icons/LeftArrow"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { usePhotoStore } from "../../store/photoStore"
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withTiming,
    interpolate,
    Extrapolate,
  } from 'react-native-reanimated';
  
type MainStackParamList = {
  EditProduct: { id: string };
  CameraScreen: { type: string };
};

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const EditProduct = () => {
    const modalTranslateY = useSharedValue(500);
const overlayOpacity = useSharedValue(0);

    const insets = useSafeAreaInsets()
    const { theme, isDark } = useTheme()
    const styles = createStyles(theme, isDark)
    const navigation = useNavigation<NavigationProp>()
    const queryClient = useQueryClient()
    const route = useRoute<RouteProp<MainStackParamList, "EditProduct">>()
    const { id } = route.params
    const [selectedImages, setSelectedImages] = useState<{ uri: string; type: string; name: string }[]>([])
    const [showImageOptions, setShowImageOptions] = useState(false)
    const { editProductPhoto } = usePhotoStore()
    const { data: product, isLoading: isLoadingProduct } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct(id)
    })

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm<EditProductField>({
        resolver: zodResolver(EditProductSchema),
        defaultValues: {
            title: "",
            description: "",
            price: "",
            location: {
                name: "",
                longitude: 0,
                latitude: 0,
            },
        },
    })
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
            
    useEffect(() => {
        if (product) {
            reset({
                title: product.title,
                description: product.description,
                price: product.price.toString(),
                location: product.location,
            })
            if (product.images?.length > 0) {
                setSelectedImages(product.images.map((img: any) => ({
                    uri: `https://backend-practice.eurisko.me${img.url}`,
                    type: 'image/jpeg',
                    name: 'image.jpg'
                })))
            }
        }
    }, [product, reset])

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: EditProductField) => {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('price', data.price);
            formData.append('location', JSON.stringify({
                name: 'Dummy Place',
                longitude: 35.12345,
                latitude: 33.56789
            }));
        
          selectedImages.forEach((image, index) => {
            formData.append('images', {
              uri: image.uri,
              type: image.type,
              name: image.name,
            });
          });
            return updateProduct(id, formData);
        },
        onSuccess: () => {
            Alert.alert("Success", "Product updated successfully")
            queryClient.invalidateQueries({ queryKey: ['product', id] });
            queryClient.invalidateQueries({ queryKey: ['products']});
            navigation.goBack()
        },
        onError: (error) => {
            console.error("Update product error:", error)
            Alert.alert("Error", "Failed to update product. Please try again.")
        },
    })
    useEffect(() => {
        if (editProductPhoto) {
            const imageObject = {
                uri: editProductPhoto,
                type: 'image/jpeg', 
                name: 'camera_photo.jpg', 
            };
            setSelectedImages((prev) => [...prev, imageObject].slice(0, 5));
        }
    }, [editProductPhoto]);
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

    const onSubmit = (data: EditProductField) => {
        if (selectedImages.length === 0) {
            Alert.alert("Error", "Please select at least one image")
            return
        }
        mutate(data)
    }

    if (isLoadingProduct) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        <LinearGradient colors={theme.gradient} style={{ flex: 1 }}>
            <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
            <ArrowLeftIcon />
                <View style={styles.header}>

                    <CustomText style={styles.title}>Edit Product</CustomText>
                </View>
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

                    <Controller
                        name="location.name"
                        control={control}
                        render={({ field }) => (
                            <InputWithLabel
                                {...field}
                                label="Location"
                                style={styles.input}
                            />
                        )}
                    />
                    {errors.location?.name && (
                        <CustomText style={styles.errorText}>
                            {errors.location.name.message}
                        </CustomText>
                    )}

                    <View style={styles.imageSection}>
                        <CustomText style={styles.sectionTitle}>Images</CustomText>
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
                            style={styles.imageButton}
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
                        style={[styles.button, !isValid && styles.buttonDisabled]}
                        onPress={handleSubmit(onSubmit)}
                        disabled={!isValid || isPending}
                    >
                        <CustomText style={styles.buttonText}>
                            {isPending ? "Updating..." : "Update Product"}
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
                            type: 'editProduct'
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

export default EditProduct 