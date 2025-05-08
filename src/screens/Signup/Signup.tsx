import { View, Text, Pressable, KeyboardAvoidingView, Platform,ScrollView,TouchableWithoutFeedback,Keyboard} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {InputWithLabel} from "../../components/molecules/InputWithLabel/InputWithLabel"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { SignupSchema } from "../../schema/SignupSchema"
import type { SignupField } from "../../schema/SignupSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { createStyles } from "./Signup.style"
import { Logo } from "../../assets/Logo"
import LinearGradient from "react-native-linear-gradient"
import { PasswordInput } from "../../components/atoms/passwordInput/PasswordInput"
import {Label} from "../../components/atoms/Label/Label"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import ArrowLeftIcon from "../../assets/LeftArrow"
import { useTheme } from "../../store/themeContext"
import { errorStyles } from "../../globalStyles/error.style"
import AlertTriangleIcon from "../../assets/AlertTriangle"
import { CustomText } from "../../components/atoms/CustomText/CustomText"
const Signup = () => {
    const insets = useSafeAreaInsets()
    const {isDark, theme} = useTheme()
    const styles = createStyles(theme, isDark)
    type AuthStackParamList = {
      Login: undefined;
      Signup: undefined;
      Verification: undefined;
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
          navigation.navigate('Verification')
      }
    
  return (
    <KeyboardAvoidingView 
      behavior="height"
      style={{flex:1}}
    >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <LinearGradient
      colors={theme.gradient} 
      style={[styles.container]}
    >
      <View style={{marginLeft:20,paddingTop : insets.top}}>
        <ArrowLeftIcon />
      </View>
     
    <ScrollView contentContainerStyle={{alignItems: 'center', flexGrow: 1, paddingBottom: insets.bottom}} keyboardShouldPersistTaps="handled">
      <View style={[
        styles.card
      ]}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <Text style={styles.title}>Sign Up</Text>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputWithLabel
            {...field}
            label="Name"
          />
        )}
      />
      <View style={errorStyles.container}>
          {errors.name && <View style={errorStyles.wrap}><AlertTriangleIcon /><Text style={errorStyles.message}>{errors.name.message}</Text></View>}
      </View>
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
      <View style={errorStyles.container}>
          {errors.email && <View style={errorStyles.wrap}><AlertTriangleIcon /><Text style={errorStyles.message}>{errors.email.message}</Text></View>}
      </View>
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <InputWithLabel
            {...field}
            label="Phone Number"
          />
        )}
      />
      <View style={errorStyles.container}>
          {errors.phone && <View style={errorStyles.wrap}><AlertTriangleIcon /><Text style={errorStyles.message}>{errors.phone.message}</Text></View>}
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
      </View>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#0057b7' : '#007bff' }
          ]}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
        <CustomText style={styles.signupText}>
          Already have an account?{' '}
          <CustomText style={{ color: 'blue' }} onPress={() => navigation.navigate('Login')}>
            Login
          </CustomText>
        </CustomText>
      </View>
    </ScrollView>
    </LinearGradient>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export {Signup}