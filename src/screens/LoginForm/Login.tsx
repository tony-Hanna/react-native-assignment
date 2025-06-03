import { View, Text, Pressable, StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {InputWithLabel} from "../../components/molecules/InputWithLabel/InputWithLabel"
import { useForm, Controller } from "react-hook-form"
import { LoginSchema } from "../../schema/LoginSchema"
import { useMutation } from "@tanstack/react-query"
import type { LoginField } from "../../schema/LoginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { createStyles } from "./Login.style"
import { Logo } from "../../assets/icons/Logo"
import LinearGradient from "react-native-linear-gradient"
import { PasswordInput } from "../../components/atoms/passwordInput/PasswordInput"
import {Label} from "../../components/atoms/Label/Label"
import AlertTriangleIcon from "../../assets/icons/AlertTriangle"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useTheme } from "../../store/themeContext"
import { errorStyles } from "../../globalStyles/error.style"
import { CustomText } from "../../components/atoms/CustomText/CustomText"
import { AuthStackParamList } from "../../navigation/stacks/types"
import { loginUser } from "../../api/loginUser"
import { useAuthStore } from "../../store/AuthStore"
import { useMemo } from "react"
const Login = () => {
    const insets = useSafeAreaInsets()
    const {isDark, theme} = useTheme()
    const styles = useMemo(() => createStyles(theme, isDark), [theme, isDark]);
    const {setTokens} = useAuthStore()
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>()
    const {
      handleSubmit,
      control,
      setError,
      formState: {  errors }
    } = useForm<LoginField>({
      resolver: zodResolver(LoginSchema)
    })

    const {mutate, isPending} = useMutation({
      mutationFn: (data: LoginField) => loginUser(data),
      onSuccess: ({accessToken,refreshToken}) => {
        setTokens(accessToken,refreshToken)
      },
      onError: (error) => {
        console.log(error)
        setError('root', {message: 'Invalid email or password'})
      }
    })
    const onSubmit = (data: LoginField) => {
      mutate(data)
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
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <Text style={styles.title}>Login</Text>
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
      <Label label="Password"/>
      <Controller 
        name="password"
        control={control}
        defaultValue=""
        render={({field}) => (
          <PasswordInput  
            {...field}
        />
        )}
        
      />
    
    <View style={errorStyles.container}>
          {errors.password && <View style={errorStyles.wrap}><AlertTriangleIcon /><Text style={errorStyles.message}>{errors.password.message}</Text></View>}
          {!errors.password && errors.root && <View style={errorStyles.wrap}><AlertTriangleIcon /><Text style={errorStyles.message}>{errors.root.message}</Text></View>}
      </View>
    
      
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#0057b7' : '#007bff' }
          ]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>{isPending ? 'Logging in...' : 'Login'}</Text>
        </Pressable>
        <CustomText style={styles.signupText}>
          Don't have an account?{' '}
          <CustomText style={{ color: 'blue' }} onPress={() => navigation.navigate('Signup')}>
            Sign up
          </CustomText>
        </CustomText>
        <CustomText style={styles.signupText}>
          Forgot your Password?{' '}
          <CustomText style={{ color: 'blue' }} onPress={() => navigation.navigate('ForgotPassword')}>
            Change password
          </CustomText>
        </CustomText>


      </View>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
    </LinearGradient>
  )
}

export {Login}