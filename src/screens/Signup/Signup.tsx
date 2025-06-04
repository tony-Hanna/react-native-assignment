import { View, Text, Pressable, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard, Alert } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { InputWithLabel } from "../../components/molecules/InputWithLabel/InputWithLabel"
import { useForm, Controller } from "react-hook-form"
import { SignupSchema } from "../../schema/SignupSchema"
import type { SignupField } from "../../schema/SignupSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { createStyles } from "./Signup.style"
import { Logo } from "../../assets/icons/Logo"
import LinearGradient from "react-native-linear-gradient"
import { PasswordInput } from "../../components/atoms/passwordInput/PasswordInput"
import { Label } from "../../components/atoms/Label/Label"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import ArrowLeftIcon from "../../assets/icons/LeftArrow"
import { useTheme } from "../../store/themeContext"
import { errorStyles } from "../../globalStyles/error.style"
import AlertTriangleIcon from "../../assets/icons/AlertTriangle"
import { CustomText } from "../../components/atoms/CustomText/CustomText"
import { useMutation } from "@tanstack/react-query"
import { signupUser } from "../../api/signupUser"
import { AuthStackParamList } from "../../navigation/stacks/types"
import { launchImageLibrary } from 'react-native-image-picker'
import { useMemo, useState } from "react"

const Signup = () => {
  const insets = useSafeAreaInsets()
  const { isDark, theme } = useTheme()
  const styles = useMemo(() => createStyles(theme, isDark, insets),[theme, isDark])
  const [profileImage, setProfileImage] = useState<{ uri: string; type: string; name: string } | undefined>(undefined)
 
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>()
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors }
  } = useForm<SignupField>({
    resolver: zodResolver(SignupSchema)
  })

  const handleImagePick = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 500,
      maxHeight: 500,
    }, (response) => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        Alert.alert('Error', 'Failed to pick image');
        return;
      }
      if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        if (asset.uri && asset.type && asset.fileName) {
          setProfileImage({
            uri: asset.uri,
            type: asset.type,
            name: asset.fileName,
          });
        }
      }
    });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignupField) => signupUser({ ...data, profileImage }),
    onSuccess: (data) => {
      console.log('Signup response:', data)
      const formData = getValues()
      navigation.navigate('Verification', { 
        email: formData.email,
        password: formData.password
      })
    },
    onError: (error) => {
      console.log('Signup error:', error)
    }
  })

  const onSubmit = (data: SignupField) => {
    mutate(data)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={theme.gradient}
        style={[styles.container]}
      >
        <KeyboardAvoidingView
          behavior="height"
          keyboardVerticalOffset={20}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, paddingTop: insets.top }}
        >
          <ScrollView keyboardShouldPersistTaps="handled">
            <Pressable style={[styles.arrowContainer, { paddingTop: insets.top }]}>
              <ArrowLeftIcon />
            </Pressable>
            <View style={[styles.card]}>
              <View style={styles.logoContainer}>
                <Logo />
                <Text style={styles.title}>Sign Up</Text>
              </View>

              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputWithLabel
                    {...field}
                    label="First Name"
                    style={styles.input}
                  />
                )}
              />
              <View style={errorStyles.container}>
                {errors.firstName && <View style={errorStyles.wrap}><AlertTriangleIcon /><Text style={errorStyles.message}>{errors.firstName.message}</Text></View>}
              </View>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputWithLabel
                    {...field}
                    label="Last Name"
                    style={styles.input}
                  />
                )}
              />
              <View style={errorStyles.container}>
                {errors.lastName && <View style={errorStyles.wrap}><AlertTriangleIcon /><Text style={errorStyles.message}>{errors.lastName.message}</Text></View>}
              </View>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <InputWithLabel
                    {...field}
                    label="Email"
                    style={styles.input}
                  />
                )}
              />
              <View style={errorStyles.container}>
                {errors.email && <View style={errorStyles.wrap}><AlertTriangleIcon /><Text style={errorStyles.message}>{errors.email.message}</Text></View>}
              </View>
              <Label label="Password" />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                  />
                )}
              />
              <View style={errorStyles.container}>
                {errors.password && <View style={errorStyles.wrap}><AlertTriangleIcon /><Text style={errorStyles.message}>{errors.password.message}</Text></View>}
              </View>
              
              <View style={styles.imageSelectionContainer}>
                <Text style={styles.imageStatusText}>
                  {profileImage ? 'Image Selected' : 'No Image Selected'}
                </Text>
                <Pressable style={styles.editImageButton} onPress={handleImagePick}>
                  <Text style={styles.editImageText}>
                    {profileImage ? 'Change Photo' : 'Add Photo'}
                  </Text>
                </Pressable>
              </View>
              
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  { backgroundColor: pressed ? '#0057b7' : '#007bff' }
                ]}
                onPress={handleSubmit(onSubmit)}
              >
                <Text style={styles.buttonText}>{isPending ? 'Signing Up...' : 'Sign Up'}</Text>
              </Pressable>
              <CustomText style={styles.signupText}>
                Already have an account?{' '}
                <CustomText style={{ color: 'blue' }} onPress={() => navigation.navigate('Login')}>
                  Login
                </CustomText>
              </CustomText>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  )
}

export { Signup }