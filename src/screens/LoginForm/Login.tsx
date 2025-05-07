import { View, Text, Pressable} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {InputWithLabel} from "../../components/molecules/InputWithLabel/InputWithLabel"
import { useForm, SubmitHandler, Controller, set } from "react-hook-form"
import { LoginSchema } from "../../schema/LoginSchema"
import type { LoginField } from "../../schema/LoginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginStyles as styles } from "./Login.style"
import { Logo } from "../../assets/Logo"
import LinearGradient from "react-native-linear-gradient"
import { PasswordInput } from "../../components/atoms/passwordInput/PasswordInput"
import {Label} from "../../components/atoms/Label/Label"
import { useAuth } from "../../store/AuthContext"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
const Login = () => {
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
    } = useForm<LoginField>({
      resolver: zodResolver(LoginSchema)
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
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Text style={styles.signupText}>
          Don't have an account?{' '}
          <Text style={{ color: 'blue' }} onPress={() => navigation.navigate('Signup')}>
            Sign up
          </Text>
        </Text>

      </View>
    </LinearGradient>
  )
}

export {Login}