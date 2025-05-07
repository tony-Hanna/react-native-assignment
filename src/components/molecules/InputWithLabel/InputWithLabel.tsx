import { View } from "react-native"
import { Label } from "../../atoms/Label/Label"
import { Input } from "../../atoms/Input/Input"
import { InputWithLabelProps } from "./InputWithLabel.type"
import { inputWithLabelStyles as styles} from "./InputWithLabel.style"
const InputWithLabel: React.FC<InputWithLabelProps> = ({ label, placeholder, secureTextEntry, ...props }) => {
    return (
        <View>
            <Label label={label}  style={styles.label}/>
            <Input 
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                {...props}
            />
        </View>
    )
}

export {InputWithLabel}