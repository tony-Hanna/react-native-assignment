import React, { useState } from "react";
import { View, Image, Pressable, ScrollView, ActivityIndicator, FlatList, Dimensions } from "react-native";
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
import { getProfile } from "../../api/getProfile";
import { deleteProduct } from "../../api/deleteProduct";
import { QueryKeys } from "../../constants/QueryKeys";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type DetailsScreenNavigationProp = NativeStackNavigationProp<MainStackParamList, 'Details'>;

interface User {
  id: string;
}

const Details = () => {
  const route = useRoute<RouteProp<MainStackParamList, "Details">>();
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const { id } = route.params;
  const { theme } = useTheme();
  const { userId } = useAuthStore();
  const [activeIndex, setActiveIndex] = useState(0);
  
  console.log('userId', userId)
  const {data: product, isLoading, error} = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id)
  })
console.log('product images', product?.images[0].url)

  const { data: userData, isLoading: isLoadingProfile } = useQuery<User>({
    queryKey: QueryKeys.PROFILE,
    queryFn: getProfile
  });

  const isProductOwner = product?.user?._id === userData?.id;

  const { mutate: deleteProductMutation } = useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess: () => {
      navigation.navigate('MainTabs');
    },
    onError: (error) => {
      console.error('Error deleting product:', error);
    },
  });
  if (isLoading || isLoadingProfile) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <CustomText style={styles.errorText}>Error loading product.</CustomText>
      </View>
    );
  }
  const handleDelete = () => {
    deleteProductMutation();
  };
  const handleEdit = () => {
    navigation.navigate('EditProduct', { id });
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
              <Image
                source={{ uri: `https://backend-practice.eurisko.me${item.url}` }}
                style={styles.image}
                resizeMode="contain"
              />
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
  
            
        <View style={styles.buttonContainer}>
          {isProductOwner ? (
            <>
              <Pressable style={[styles.button, styles.editButton]} onPress={handleEdit}>
                <CustomText style={styles.buttonText}>Edit</CustomText>
              </Pressable>
              <Pressable style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                <CustomText style={styles.buttonText}>Delete</CustomText>
              </Pressable>
            </>
          ) : (
            <>
            
              <Pressable style={styles.button}>
                <CustomText style={styles.buttonText}>Share</CustomText>
              </Pressable>
              <Pressable style={[styles.button, styles.cartButton]}>
                <CustomText style={styles.buttonText}>Add to Cart</CustomText>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export { Details };
