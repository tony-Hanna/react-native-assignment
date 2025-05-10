import { TextInput, TouchableOpacity, View, Text } from "react-native"
import { InputProps } from "../Input/Input.type"
import { useState } from "react"
import Svg, { Path } from 'react-native-svg'
import { passwordStyles } from "./PasswordInput.style" 
import { useTheme } from "../../../store/themeContext" 
const PasswordInput: React.FC<InputProps> = ({
  placeholder,  
  style,
  onChange,
  onBlur,
  value
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const {theme} = useTheme()
  const styles = passwordStyles(theme)
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        placeholder={placeholder}
        style={[styles.input, style]}
        secureTextEntry={!showPassword}
        value={value}
        onChangeText={onChange}
        onBlur={onBlur}
        placeholderTextColor={theme.text}
      />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setShowPassword((prev) => !prev)}
        >
          <Text style={{ fontSize: 18 }}>
            {showPassword ? 
            
            <Svg width={22} height={22} viewBox="0 0 24 24" strokeWidth={1.5} stroke="#666" fill="none">
                <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3l18 18M10.477 10.477a3 3 0 0 0 4.242 4.242M9.879 5.879C10.891 5.317 11.932 5 13 5c4.638 0 8.573 3.007 9.963 7.178a1.01 1.01 0 0 1 0 .644 12.087 12.087 0 0 1-2.026 3.178M6.624 6.624C4.575 8.086 3.026 10.221 2.036 12.322a1.01 1.01 0 0 0 0 .644c1.39 4.171 5.325 7.178 9.963 7.178 1.55 0 3.03-.328 4.384-.926"
                />
            </Svg>
            :             
            <Svg width={22} height={22} viewBox="0 0 24 24" strokeWidth={1.5} stroke="#666" fill="none">
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <Path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </Svg>
            }
          </Text>
        </TouchableOpacity>
    </View>
  )
}


export { PasswordInput }
