import { TextInput } from "react-native"
import { InputProps } from "./Input.type"
import { inputStyles } from "./Input.style"
const Input: React.FC<InputProps> = ({ placeholder, style, secureTextEntry, onChange, onBlur, value}) => {
    return (
        <TextInput 
            placeholder={placeholder}
            style={[inputStyles.input, style]}
            secureTextEntry={secureTextEntry}
            value={value}
            onChangeText={onChange} 
            onBlur={onBlur}
        />
    )
}

export {Input}
