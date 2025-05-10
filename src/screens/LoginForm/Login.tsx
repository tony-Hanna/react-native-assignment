import { View, Text, Pressable, StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {InputWithLabel} from "../../components/molecules/InputWithLabel/InputWithLabel"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { LoginSchema } from "../../schema/LoginSchema"
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
const Login = () => {
    const insets = useSafeAreaInsets()
    const {isDark, theme} = useTheme()
    const styles = createStyles(theme, isDark)
    type AuthStackParamList = {
      Login: undefined;
      Signup: undefined;
      Verification: undefined
    }
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>()
    const {
      handleSubmit,
      control,
      setError,
      formState: {isValid, errors, isSubmitting}
    } = useForm<LoginField>({
      resolver: zodResolver(LoginSchema)
    })
    const onSubmit = (data: any) => {
        if(data.email === 'eurisko@gmail.com'&& data.password === 'academy2025'){
          console.log('success')
          navigation.navigate('Verification')
      }
      else{
        setError("root", { message: "Invalid email or password" })
      }
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
          <Text style={styles.buttonText}>Login</Text>
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

export {Login}