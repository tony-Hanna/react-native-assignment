import React, { useState } from "react";
import { View, Image, Pressable, ScrollView, FlatList, Dimensions, Alert, Share } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { CustomText } from "../../components/atoms/CustomText/CustomText";
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from "../../store/themeContext";
import { detailsStyles as styles } from "./Details.style";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProduct } from "../../api/getProduct";
import { useAuthStore } from "../../store/AuthStore";
import { useCartStore } from "../../store/CartStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainStackParamList } from "../../navigation/stacks/types";
import { deleteProduct } from "../../api/deleteProduct";
import { saveImage } from "../../utils/handleLongPress";
import { openComposer } from "react-native-email-link";
import Toast from "react-native-toast-message";
const { width: SCREEN_WIDTH } = Dimensions.get("window");
import { DetailsSkeleton } from "./DetailsSkeleton";
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { formatRelativeTime } from "../../utils/formatRelativeTime";
import {TrashIcon,EditIcon,CartIcon,LocationIcon,ShareIcon,EmailIcon,ArrowLeftIcon} from "../../assets/icons"
import { Refetch } from "../../components/organisms/Refetch/Refetch";
import { useButtonAnimation } from '../../hooks/useButtonAnimation'
type DetailsScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Details' | 'Location'>;

const Details = () => {
  const route = useRoute<RouteProp<MainStackParamList, "Details">>();
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const { id } = route.params;
  const { theme } = useTheme();
  const { userId } = useAuthStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const { animatedStyle, handlePressIn, handlePressOut } = useButtonAnimation();
  const {data: product, isLoading, error, refetch} = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
  })

  const isProductOwner = product?.user?._id === userId;

  const { mutate: deleteProductMutation } = useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: () => {
      navigation.navigate('MainTabs');
      Toast.show({
        type: 'success',
        text1: 'product deleted successfully',
      });
    },
    onError: () => {
      Toast.show({
        type: 'error',
        text1: 'error deleting product',
      });
    },
  });
  const { addItem, isInCart } = useCartStore();
  const isItemInCart = isInCart(id);

  if (isLoading) {
    return <DetailsSkeleton />;
  }

  const handleDelete = () => {
    deleteProductMutation();
  };
  const handleEdit = () => {
    navigation.navigate('EditProduct', { id });
  };

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

const handleAddToCart = () => {
  if (!product) return;
  
  addItem({
    _id: product._id,
    title: product.title,
    price: product.price,
    images: product.images,
    description: product.description,
    location: product.location,
  });
  
  setShowSuccess(true);
  setTimeout(() => setShowSuccess(false), 1500);
  
  Toast.show({
    type: 'success',
    text1: isItemInCart ? 'Quantity updated in cart' : 'Item added to cart',
  });
};

const handleShare = async () => {
  try {
    const url = `https://firstapp.com/product/${product._id}`;
    await Share.share({
      message: `Check out this product: ${product.title}\n${url}`,
      url,
      title: product.title,
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Could not share product',
    });
  }
};
const formattedDate =() => {
  const date = new Date(product.updatedAt);
  return formatRelativeTime(date);
}
  return (
    <Animated.View 
      entering={FadeIn.duration(300)} 
      exiting={FadeOut.duration(300)} 
      style={{ flex: 1 }}
    >
      <LinearGradient colors={theme.gradient} style={styles.container}>
        {error ? <Refetch message="product" refetch={refetch}/>
         : (
          <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.header}>
                <View style={styles.arrow}>
                  <ArrowLeftIcon />
                </View>
                <Pressable style={styles.share} onPress={handleShare}>
                  <ShareIcon size={24} color="#007AFF" />
                </Pressable>
              </View>
              <View style={styles.imageContainer}>
                <FlatList
                  data={product.images}
                  horizontal
                  pagingEnabled
                  keyExtractor={(index) => index.toString()}
                  showsHorizontalScrollIndicator
                  onMomentumScrollEnd={(event) => {
                    const index = Math.round(event.nativeEvent.contentOffset.x / (SCREEN_WIDTH - 40));
                    setActiveIndex(index);
                  }}
                  renderItem={({ item }) => (
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
              <View style={styles.titleDateWrap}>
                <CustomText style={styles.title}>{product.title}</CustomText>
                <CustomText style={styles.dateText}> {formattedDate()} </CustomText>
              </View>
              <CustomText style={styles.price}>${product.price}</CustomText>

              <CustomText style={[styles.description, { fontSize: 14, color: theme.text }]}>{product.description}</CustomText>
              <View style={styles.contactRow}>
                <View style={{marginRight:7}}>
                  <LocationIcon />
                </View>
                <CustomText style={styles.sectionTitle}>{product.location.name}</CustomText>
              </View>
              <View style={styles.contactRow}>
                  <EmailIcon size={18} color={theme.text} />
                  <CustomText style={styles.contactText}>{product.user.email}</CustomText>
                </View>

              
              <View style={styles.buttonContainer}> 
                <View style={{flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                    {isProductOwner ? (
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                        <Pressable style={styles.button} onPress={handleEdit}>
                          <View style={styles.IconButtonTextWrap}>
                          <EditIcon color='white'/>
                          <CustomText style={styles.buttonText}>Edit</CustomText>
                          </View>
                        </Pressable>
                        <Pressable style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                          <View style={styles.IconButtonTextWrap}>
                          <TrashIcon color='white'/>
                          <CustomText style={styles.buttonText}>Delete</CustomText>
                          </View>
                        </Pressable>
                      </View>
                    ) : (
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                        <Pressable style={[styles.button, styles.contactButton]} onPress={handleEmailOwner}>
                          <View style={styles.IconButtonTextWrap}>
                            <EmailIcon size={18} color="#fff" />
                            <CustomText style={styles.buttonText}>Contact Seller</CustomText>
                          </View>
                        </Pressable>
                        <Animated.View style={animatedStyle}>
                        <Pressable 
                          style={[
                            styles.button, 
                            styles.cartButton,
                            isItemInCart && !showSuccess && { backgroundColor: '#2e8b57' },
                            showSuccess && { backgroundColor: '#808080' }
                          ]} 
                          onPress={handleAddToCart}
                          disabled={showSuccess}
                          onPressIn={handlePressIn}
                          onPressOut={handlePressOut}
                        >
                          <View style={styles.IconButtonTextWrap}>
                            <CartIcon />
                            <CustomText style={styles.buttonText}>
                              {showSuccess ? 'item added   ' : (isItemInCart ? 'Add Another' : 'Add to Cart')}
                            </CustomText>
                          </View>
                        </Pressable>
                        </Animated.View>
                      </View>
                    )}
                  </View>
                  <Pressable 
                    style={[styles.button, styles.cartButton]} 
                    onPress={() => {
                      navigation.navigate('Location', {
                        latitude: product.location.latitude,
                        longitude: product.location.longitude,
                        fromProductDetails: true
                      });
                    }}
                  >
                    <View style={styles.IconButtonTextWrap}>
                      <LocationIcon color='white'/>
                      <CustomText style={styles.buttonText}>View location on map</CustomText>
                    </View>
                  </Pressable>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
      </LinearGradient>
    </Animated.View>
  );
};

export { Details };
