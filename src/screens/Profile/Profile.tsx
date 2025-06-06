import React, { useState, useEffect, useMemo } from 'react';
import { View, ScrollView, Pressable, Image, Alert } from 'react-native';
import { useTheme } from '../../store/themeContext';
import { CustomText } from '../../components/atoms/CustomText/CustomText';
import { InputWithLabel } from '../../components/molecules/InputWithLabel/InputWithLabel';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '../../store/AuthStore';
import { createStyles } from './Profile.style';
import {EmailIcon, Logo} from '../../assets/icons';
import { updateProfile } from '../../api/updateProfile';
import { getProfile } from '../../api/getProfile';
import { ProfileField, ProfileSchema } from '../../schema/profileSchema';
import { launchImageLibrary } from 'react-native-image-picker';
import { QueryKeys } from '../../constants/QueryKeys';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/stacks/types';
import { usePhotoStore } from '../../store/photoStore';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import DefaultProfileIcon from '../../assets/icons/ProfileIcon';
import { Refetch } from '../../components/organisms/Refetch/Refetch';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const Profile = () => {
  const modalTranslateY = useSharedValue(500);
const overlayOpacity = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);
  const { clearTokens } = useAuthStore();
  const queryClient = useQueryClient();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const { profilePhoto } = usePhotoStore()
  const { data: userData, isLoading: isLoadingProfile, error: profileError, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ProfileField>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      profileImage: userData?.profileImage?.url || ''
    },
  });
  useEffect(() => {
    if (userData) {
      reset({
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
      if (userData.profileImage?.url) {
        setProfileImage(userData.profileImage.url);
      }
    }
  }, [userData, reset, profileImage]);

  // Handle photo from camera
  useEffect(() => {
    if (profilePhoto) {
      const imageObject = {
        uri: profilePhoto,
        type: 'image/jpeg',
        name: 'camera_photo.jpg',
      };
      
      mutate({
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
        profileImage: imageObject,
      });
    }
  }, [profilePhoto]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ProfileField) => {
      const response = await updateProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        profileImage: data.profileImage,
      });
      return response;
    },
    onSuccess: (data) => {
      Toast.show({
        type: 'success',
        text1: 'profile update successfully',
      });
      // Update local state with new user data
      queryClient.invalidateQueries({ queryKey: QueryKeys.PROFILE });
      if (data.data?.user?.profileImage?.url) {
        setProfileImage(data.data.user.profileImage.url);
      }
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: JSON.stringify(error),
      });
    },
  });

  const onSubmit = (data: ProfileField) => {
    mutate(data);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: clearTokens,
          style: 'destructive',
        },
      ],
    );
  };
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
        mediaType: 'photo',
        quality: 0.8,
      });
 
      if (result.assets && result.assets[0]?.uri) {
        setProfileImage(result.assets[0].uri);
        const imageObject = {
          uri: result.assets[0].uri,
          type: result.assets[0].type || 'image/jpeg',
          name: result.assets[0].fileName || 'profile.jpg',
        };
        
        mutate({
          firstName: userData?.firstName || '',
          lastName: userData?.lastName || '',
          profileImage: imageObject,
        });
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  if (isLoadingProfile) {
    return (
      <LinearGradient colors={theme.gradient} style={{ flex: 1, alignItems:'center',justifyContent:'center' }}>
        <LottieView
            source={require('../../assets/lottie/loading.json')}
            autoPlay
            loop
            style={styles.lottieAnimation}
        />
      </LinearGradient>
    );
  }
  if (profileError) {
    return <Refetch message={profileError.message} refetch={refetch} />
}

  return (
    <LinearGradient colors={theme.gradient} style={{ flex: 1 }}>
      <View style={[styles.header, { paddingTop: insets.top, paddingBottom: 25 }]}>
        <View style={styles.logo}>
          <Logo w={40} h={40} />
          <CustomText style={{ fontSize: 20 }}>Profile</CustomText>
        </View>
        <Pressable onPress={handleLogout} style={styles.logoutBotton}>
          <CustomText style={styles.logoutText}>Logout</CustomText>
        </Pressable>
      </View> 
      <ScrollView style={[styles.container, { paddingTop: insets.top }]}>

        <View style={styles.profileImageContainer}>
          <Pressable style={styles.editImageButton} onPress={() => setShowImageOptions(true)}>
          {profileImage ? (
            <Image
              source={{ uri: `https://backend-practice.eurisko.me${profileImage}` }}
              style={styles.profileImage}
            />
          ) : (
            <DefaultProfileIcon size={100} />
          )}
          </Pressable>
          <Pressable style={styles.editImageButton} onPress={() => setShowImageOptions(true)}>
            <CustomText style={styles.editImageText}>Change Photo</CustomText>
          </Pressable>
        </View>
        <View style={styles.emailIconWrap}>
          <EmailIcon color={theme.text}/>
          <CustomText style={styles.email}>{userData.email}</CustomText>
        </View>
        <View style={styles.form}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                {...field}
                label="First Name"
                style={styles.input}
              />
            )}
          />
          {errors.firstName && (
            <CustomText style={styles.errorText}>{errors.firstName.message}</CustomText>
          )}

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                {...field}
                label="Last Name"
                style={styles.input}
              />
            )}
          />
          {errors.lastName && (
            <CustomText style={styles.errorText}>{errors.lastName.message}</CustomText>
          )}

          <Pressable
            style={[styles.button, !isValid && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || isPending}
          >
            <CustomText style={styles.buttonText}>
              {isPending ? 'Saving...' : 'Save Changes'}
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
              type: 'profile'
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
  );
};

export { Profile }; 