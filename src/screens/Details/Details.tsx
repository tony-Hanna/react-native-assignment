import React, { useState } from "react";
import { View, Image, Pressable, ScrollView, ActivityIndicator, FlatList, Dimensions, Alert } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { CustomText } from "../../components/atoms/CustomText/CustomText";
import ArrowLeftIcon from "../../assets/icons/LeftArrow";
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from "../../store/themeContext";
import { detailsStyles as styles } from "./Details.style";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProduct } from "../../api/getProduct";
import { useAuthStore } from "../../store/AuthStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/stacks/types";
import { deleteProduct } from "../../api/deleteProduct";
import { QueryKeys } from "../../constants/QueryKeys";
import { saveImage } from "../../utils/handleLongPress";
import { openComposer } from "react-native-email-link";
import  EmailIcon  from "../../assets/icons/EmailIcon";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
import Toast from "react-native-toast-message";
type DetailsScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Details' | 'Location'>;


const Details = () => {
  const route = useRoute<RouteProp<MainStackParamList, "Details">>();
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const { id } = route.params;
  const { theme } = useTheme();
  const { userId } = useAuthStore();
  const [activeIndex, setActiveIndex] = useState(0);
  
  console.log('userId', userId)
  const {data: product, isLoading, error, refetch} = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
  })
console.log('product images', product)

  // const { data: userData, isLoading: isLoadingProfile } = useQuery<User>({
  //   queryKey: QueryKeys.PROFILE,
  //   queryFn: getProfile
  // });

  const isProductOwner = product?.user?._id === userId;

  const { mutate: deleteProductMutation } = useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: (data) => {
      console.log(data)
      navigation.navigate('MainTabs');
      Toast.show({
        type: 'success',
        text1: 'product deleted successfully',
      });
    },
    onError: (error) => {
      console.error('Error deleting product:', error);
      Toast.show({
        type: 'error',
        text1: 'error deleting product',
      });
    },
  });
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, { padding: 20 }]}>
        <CustomText style={[styles.errorText, { marginBottom: 16 }]}>
          {error instanceof Error 
            ? `Error: ${error.message}`
            : 'Failed to load product. Please try again.'}
        </CustomText>
        <Pressable 
          style={[styles.retryButton, { backgroundColor: '#2e8b57' }]} 
          onPress={() => refetch()}
        >
          <CustomText style={styles.buttonText}>Retry</CustomText>
        </Pressable>
      </View>
    );
  }
  const handleDelete = () => {
    deleteProductMutation();
  };
  const handleEdit = () => {
    navigation.navigate('EditProduct', { id });
  };
  
console.log('product from details', product)

const handleEmailOwner = async () => {
  try {
    await openComposer({
      to: product.user.email,
      subject: `Regarding your product: ${product.title}`,
      body: `Hello,\n\nI'm interested in your product "${product.title}".\n\nBest regards,`,
    });
  } catch (error) {
    Alert.alert('Error', 'Could not open email client. Please try again.');
  }
};

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.arrow}>
          <ArrowLeftIcon />
        </View>

        <View style={styles.imageContainer}>
          <FlatList
            data={product.images}
            horizontal
            pagingEnabled
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator
            onMomentumScrollEnd={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / (SCREEN_WIDTH - 40));
              setActiveIndex(index);
            }}
            renderItem={({ item }) => (
              console.log('item', item),
              <Pressable onLongPress={() => saveImage(`https://backend-practice.eurisko.me${item.url}`)}>
                <Image
                  source={{ uri: `https://backend-practice.eurisko.me${item.url}` }}
                  style={styles.image}
                  resizeMode="contain"
                />
              </Pressable>
            )}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            {product.images.map((_: unknown, index: number) => (
              <View
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: index === activeIndex ? '#2e8b57' : '#ccc',
                  marginHorizontal: 4,
                }}
              />
            ))}
          </View>
        </View>

        <CustomText style={styles.title}>{product.title}</CustomText>
        <CustomText style={styles.price}>${product.price}</CustomText>

        <CustomText style={styles.sectionTitle}>Description</CustomText>
        <CustomText style={styles.description}>{product.description}</CustomText>
        <CustomText style={styles.sectionTitle}>{product.location.name}</CustomText>
        <View style={styles.contactRow}>
            <EmailIcon size={18} color={theme.text} />
            <CustomText style={styles.contactText}>{product.user.email}</CustomText>
          </View>

        
        <View style={styles.buttonContainer}>
          {isProductOwner ? (
            <View style={{flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
              <Pressable style={[styles.button, styles.editButton]} onPress={handleEdit}>
                <CustomText style={styles.buttonText}>Edit</CustomText>
              </Pressable>
              <Pressable style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                <CustomText style={styles.buttonText}>Delete</CustomText>
              </Pressable>
              </View>
              <Pressable style={[styles.button, styles.cartButton]} onPress={() => {
                  navigation.navigate('Location', {
                    latitude: product.location.latitude,
                    longitude: product.location.longitude,
                    fromProductDetails: true
                  });
                }}>
                  <CustomText style={styles.buttonText}>View location on map</CustomText>
                </Pressable>
            </View>
          ) : (
              <View style={{flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
            <Pressable style={styles.button} onPress={handleEmailOwner}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <EmailIcon size={16} color="#fff" />
                <CustomText style={[styles.buttonText, { marginLeft: 8 }]}>Contact Seller</CustomText>
              </View>
            </Pressable>
              <Pressable style={[styles.button, styles.cartButton]}>
                <CustomText style={styles.buttonText}>Add to Cart</CustomText>
              </Pressable>
              </View>
                <Pressable style={[styles.button, styles.cartButton]} onPress={() => {
                  navigation.navigate('Location', {
                    latitude: product.location.latitude,
                    longitude: product.location.longitude,
                    fromProductDetails: true
                  });
                }}>
                  <CustomText style={styles.buttonText}>View location on map</CustomText>
                </Pressable>
              </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export { Details };
