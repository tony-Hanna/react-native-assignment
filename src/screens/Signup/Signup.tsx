import { View, Text, Pressable} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {InputWithLabel} from "../../components/molecules/InputWithLabel/InputWithLabel"
import { useForm, SubmitHandler, Controller, set } from "react-hook-form"
import { SignupSchema } from "../../schema/SignupSchema"
import type { SignupField } from "../../schema/SignupSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginStyles as styles } from "../LoginForm/Login.style"
import { Logo } from "../../assets/Logo"
import LinearGradient from "react-native-linear-gradient"
import { PasswordInput } from "../../components/atoms/passwordInput/PasswordInput"
import {Label} from "../../components/atoms/Label/Label"
import { useAuth } from "../../store/AuthContext"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import ArrowLeftIcon from "../../assets/LeftArrow"
const Signup = () => {
    const insets = useSafeAreaInsets()
    const { setIsAuthenticated } = useAuth();
    type AuthStackParamList = {
      Login: undefined;
      Signup: undefined;
    }
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>()
    const {
      handleSubmit,
      control,
      formState: {isValid, errors, isSubmitting}
    } = useForm<SignupField>({
      resolver: zodResolver(SignupSchema)
    })
    const onSubmit = (data: any) => {
        if(data.email === 'eurisko@gmail.com'&& data.password === 'academy2025'){
          console.log('success')
          setIsAuthenticated(true)
      }
    }
  return (
    <LinearGradient
    colors={['#fde6d5', '#dfd4ff']} 
    style={styles.container}
  >
    <ArrowLeftIcon />
     
    <View style={[
      {paddingTop : insets.top, paddingBottom: insets.bottom}, 
      styles.card
    ]}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <Text style={styles.title}>Signup</Text>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputWithLabel
            {...field}
            label="Name"
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputWithLabel
            {...field}
            label="Email"
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputWithLabel
            {...field}
            label="Phone Number"
          />
        )}
      />
      {errors.email && <Text>{errors.email.message}</Text>}
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

      {errors.password && <Text>{errors.password.message}</Text>}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#0057b7' : '#007bff' }
          ]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </Pressable>
        <Text style={styles.signupText}>
          Already have an account?{' '}
          <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
      </View>
    </LinearGradient>
  )
}

export {Signup}