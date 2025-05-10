import React from "react";
import { View, Image, Pressable, ScrollView } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { data } from "../../../Products.json";
import { CustomText } from "../../components/atoms/CustomText/CustomText";
import ArrowLeftIcon from "../../assets/icons/LeftArrow";
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from "../../store/themeContext";
import { detailsStyles as styles } from "./Details.style";

type MainStackParamList = {
  Details: { id: string };
};

const Details = () => {
  const route = useRoute<RouteProp<MainStackParamList, "Details">>();
  const { id } = route.params;
  const { theme } = useTheme();

  const product = data.find((item) => item._id === id);

  if (!product) {
    return (
      <View style={styles.centered}>
        <CustomText style={styles.errorText}>Product not found.</CustomText>
      </View>
    );
  }

  return (
    <LinearGradient colors={theme.gradient} style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.arrow}>
          <ArrowLeftIcon />
        </View>

        <Image
          source={{ uri: product.images[0].url }}
          style={styles.image}
          resizeMode="contain" 
        />
        <CustomText style={styles.title}>{product.title}</CustomText>
        <CustomText style={styles.price}>${product.price}</CustomText>

        <CustomText style={styles.sectionTitle}>Description</CustomText>
        <CustomText style={styles.description}>{product.description}</CustomText>

        <View style={styles.buttonContainer}>
          <Pressable style={styles.button}>
            <CustomText style={styles.buttonText}>Share</CustomText>
          </Pressable>
          <Pressable style={[styles.button, styles.cartButton]}>
            <CustomText style={styles.buttonText}>Add to Cart</CustomText>
          </Pressable>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export { Details };
