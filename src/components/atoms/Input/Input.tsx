import { TextInput } from "react-native"
import { InputProps } from "./Input.type"

const Input: React.FC<InputProps> = ({ placeholder, style,  onChange, onBlur, value}) => {
    return (
        <TextInput 
            placeholder={placeholder}
            style={style}
            value={value}
            onChangeText={onChange} 
            onBlur={onBlur}
        />
    )
}

export {Input}
