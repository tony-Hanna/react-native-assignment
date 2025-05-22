import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Image, Alert, ActivityIndicator } from 'react-native';
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
import { updateProfile } from '../../api/updateProfile';
import { getProfile } from '../../api/getProfile';
import { ProfileField, ProfileSchema } from '../../schema/profileSchema';
import { launchImageLibrary } from 'react-native-image-picker';
import { QueryKeys } from '../../constants/QueryKeys';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/stacks/types';
import { usePhotoStore } from '../../store/photoStore';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

type NavigationProp = NativeStackNavigationProp<MainStackParamList>;

const Profile = () => {
  const modalTranslateY = useSharedValue(500);
const overlayOpacity = useSharedValue(0);
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useTheme();
  const styles = createStyles(theme, isDark);
  const { clearTokens } = useAuthStore();
  const queryClient = useQueryClient();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showImageOptions, setShowImageOptions] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const { profilePhoto } = usePhotoStore()
  const { data: userData, isLoading: isLoadingProfile, error: profileError } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
  console.log('profilePhoto', profilePhoto)
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
      email: userData?.email || '',
      profileImage: userData?.profileImage?.url || ''
    },
  });
  console.log('profilePhoto from profile', profilePhoto)
  // Update form values when user data is loaded
  useEffect(() => {
    if (userData) {
      reset({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
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
        email: userData?.email || '',
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
      Alert.alert('Success', 'Profile updated successfully');
      // Update local state with new user data
      queryClient.invalidateQueries({ queryKey: QueryKeys.PROFILE });
      if (data.data?.user?.profileImage?.url) {
        setProfileImage(data.data.user.profileImage.url);
      }
    },
    onError: (error) => {
      console.error('Profile update error:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
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
        console.log('result.assets[0].uri', result.assets[0].uri)
        const imageObject = {
          uri: result.assets[0].uri,
          type: result.assets[0].type || 'image/jpeg',
          name: result.assets[0].fileName || 'profile.jpg',
        };
        
        mutate({
          firstName: userData?.firstName || '',
          lastName: userData?.lastName || '',
          email: userData?.email || '',
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
      <LinearGradient colors={theme.gradient} style={{ flex: 1 }}>
        <View style={[styles.container, { paddingTop: insets.top, justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" />
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={theme.gradient} style={{ flex: 1 }}>
      <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <CustomText style={styles.title}>Profile</CustomText>
          <Pressable onPress={handleLogout}>
            <CustomText style={styles.logoutText}>Logout</CustomText>
          </Pressable>
        </View>

        <View style={styles.profileImageContainer}>
          <Pressable style={styles.editImageButton} onPress={() => setShowImageOptions(true)}>
            <Image
              source={{ uri: `https://backend-practice.eurisko.me${profileImage}` || 'https://via.placeholder.com/150' }}
              style={styles.profileImage}
            />
          </Pressable>
          <Pressable style={styles.editImageButton} onPress={() => setShowImageOptions(true)}>
            <CustomText style={styles.editImageText}>Change Photo</CustomText>
          </Pressable>
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

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputWithLabel
                {...field}
                label="Email"
                style={styles.input}
                editable={false}
              />
            )}
          />
          {errors.email && (
            <CustomText style={styles.errorText}>{errors.email.message}</CustomText>
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