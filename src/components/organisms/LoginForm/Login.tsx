import { View, ScrollView, Text, Button, Pressable, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {InputWithLabel} from "../../molecules/InputWithLabel/InputWithLabel"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { LoginSchema } from "../../../schema/LoginSchema"
import type { LoginField } from "../../../schema/LoginSchema"
import { zodResolver } from "@hookform/resolvers/zod"
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
    <View style={{paddingTop : insets.top, paddingBottom: insets.bottom}}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <InputWithLabel
            {...field}
            label="Email"
            placeholder="Enter your email"
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
            placeholder="Password" 
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
      </View>
  )
}
const styles = StyleSheet.create({
    input: {
        height: 48,
        borderColor: '#ccc',   
        borderWidth: 1,      
        marginBottom: 16,
        paddingHorizontal: 12,
        borderRadius: 4,
        marginHorizontal: 5
      },
    button: {
        height: 48,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
        width:200,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
})
export {Login}