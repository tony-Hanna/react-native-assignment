import { TextInput } from "react-native"
import { InputProps } from "./Input.type"
import { inputStyles } from "./Input.style"
import { useTheme } from "../../../store/themeContext"
const Input: React.FC<InputProps> = ({ placeholder, style, onChange, onBlur, value, editable = true}) => {
    const {theme} = useTheme()
    const styles = inputStyles(theme)
    return (
        <TextInput 
            testID="custom-input"
            placeholder={placeholder}
            style={[styles.input, style]}
            value={value}
            onChangeText={onChange} 
            onBlur={onBlur}
            editable={editable}
        />
    )
}

export {Input}