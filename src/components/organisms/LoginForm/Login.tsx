import { View, Text, Pressable} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {InputWithLabel} from "../../molecules/InputWithLabel/InputWithLabel"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { LoginSchema } from "../../../schema/LoginSchema"
import type { LoginField } from "../../../schema/LoginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginStyles as styles } from "./Login.style"
import { Logo } from "./Logo"
import LinearGradient from "react-native-linear-gradient"
import { Link } from "@react-navigation/native"
const Login = () => {
    const insets = useSafeAreaInsets()
    const {
      handleSubmit,
      control,
      formState: {isValid, errors, isSubmitting}
    } = useForm<LoginField>({
      resolver: zodResolver(LoginSchema)
    })
    const onSubmit = (data: any) => {
      if(isValid)
        console.log(data)
    }
  return (
    <LinearGradient
    colors={['#fde6d5', '#dfd4ff']} // Adjust to your gradient
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
      <Controller 
        name="password"
        control={control}
        defaultValue=""
        render={({field}) => (
          <InputWithLabel   
            {...field}
            label="Password" 
            secureTextEntry={true}
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
        <Text style={styles.signupText}>Don't have an account? <Link action={{type: 'navigate'}}>Sign up</Link></Text>
      </View>
    </LinearGradient>
  )
}

export {Login}