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
import { useState } from "react"
import { launchImageLibrary } from "react-native-image-picker"
import LinearGradient from "react-native-linear-gradient"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MainStackParamList } from "../../navigation/stacks/types"
import { usePhotoStore } from "../../store/photoStore"
import MapView from 'react-native-maps';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const AddProduct = () => {
    const insets = useSafeAreaInsets()
    const { theme, isDark } = useTheme()
    const styles = createStyles(theme, isDark)
    const navigation = useNavigation<NavigationProp>()
    const { photo } = usePhotoStore()
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
                name: "",
                longitude: 0,
                latitude: 0,
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
          return createProduct(formData);  
        },
        onSuccess: () => {
            Alert.alert("Success", "Product created successfully")
            queryClient.invalidateQueries({ queryKey: ['products']})
            reset()
            setSelectedImages([])
            navigation.goBack()
        },
        onError: (error) => {
            console.error("Create product error:", error)
            Alert.alert("Error", "Failed to create product. Please try again.")
        },
    })

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
    
    const onSubmit = (data: AddProductField) => {
        if (selectedImages.length === 0) {
            Alert.alert("Error", "Please select at least one image")
            return
        }
        mutate(data)
    }

    return (
        <LinearGradient colors={theme.gradient} style={{ flex: 1 }}>
            <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
                <View style={styles.header}>
                    <CustomText style={styles.title}>Add Product</CustomText>
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
                            {isPending ? "Creating..." : "Create Product"}
                        </CustomText>
                    </Pressable>
                </View>
            </ScrollView>
            {showImageOptions && (
                <View style={styles.modalOverlay}>
                    <Pressable 
                        style={{ flex: 1, width: '100%', height: '100%' }}
                        onPress={() => setShowImageOptions(false)}
                    >
                        <Pressable
                            style={styles.modalContent}
                            onPress={(e) => e.stopPropagation()}
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
                                navigation.navigate('CameraScreen');
                                }}
                            >
                                <CustomText style={styles.modalButtonText}>Take a Picture</CustomText>
                            </Pressable>

                            <Pressable onPress={() => setShowImageOptions(false)}>
                                <CustomText style={styles.cancelText}>Cancel</CustomText>
                            </Pressable>
                        </Pressable>
                    </Pressable>
                </View>
            )}
        </LinearGradient>
    )
}

export default AddProduct