import { View, Text, Pressable, StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {InputWithLabel} from "../../components/molecules/InputWithLabel/InputWithLabel"
import { useForm, Controller } from "react-hook-form"
import { ForgotPasswordSchema } from "../../schema/forgotPassword.Schema"
import { useMutation } from "@tanstack/react-query"
import type { ForgotPasswordField } from "../../schema/forgotPassword.Schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { createStyles } from "./ForgotPassword.style"
import { Logo } from "../../assets/icons/Logo"
import LinearGradient from "react-native-linear-gradient"
import AlertTriangleIcon from "../../assets/icons/AlertTriangle"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useTheme } from "../../store/themeContext"
import { errorStyles } from "../../globalStyles/error.style"
import { CustomText } from "../../components/atoms/CustomText/CustomText"
import { AuthStackParamList } from "../../navigation/stacks/types"
import { forgotPassword } from "../../api/forgotPassword"
import Toast from 'react-native-toast-message';
import ArrowLeftIcon from "../../assets/icons/LeftArrow"
import { useMemo } from "react"
const ForgotPassword = () => {
    const insets = useSafeAreaInsets()
    const {isDark, theme} = useTheme()
    const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>()
    const {
      handleSubmit,
      control,
      setError,
      formState: {isValid, errors }
    } = useForm<ForgotPasswordField>({
      resolver: zodResolver(ForgotPasswordSchema)
    })

    const { mutate, isPending } = useMutation({
        mutationFn: (email: string) => forgotPassword(email),
        onSuccess: (data) => {
            Toast.show({
                type: 'success',
                text1: 'Password reset email sent',
                text2: 'Please check your email',
            });
            navigation.navigate('Login');
        },
        onError: (error) => {
            Toast.show({
                type: 'error',
                text1: 'Failed to send reset email',
            });
        }
    });

    const onSubmit = (data: ForgotPasswordField) => {
        console.log(data.email)
        mutate(data.email);
    }
  return (
    <LinearGradient
    colors={theme.gradient} 
    style={styles.container}
  >
    
    <StatusBar
      barStyle={isDark ? 'light-content' : 'dark-content'}
      backgroundColor="transparent"
      translucent
    />
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    
  <KeyboardAvoidingView
    behavior="position"
  >

    <View style={[
      {paddingTop : insets.top, paddingBottom: insets.bottom}, 
      styles.card
    ]}>
        <ArrowLeftIcon />
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <Text style={styles.title}>Change Password</Text>
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
    
    
      
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#0057b7' : '#007bff' }
          ]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>{isPending ? 'submitting...' : 'request to change'}</Text>
        </Pressable>
        <CustomText style={styles.signupText}>
          Don't have an account?{' '}
          <CustomText style={{ color: 'blue' }} onPress={() => navigation.navigate('Signup')}>
            Sign up
          </CustomText>
        </CustomText>


      </View>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    </LinearGradient>
  )
}

export {ForgotPassword}