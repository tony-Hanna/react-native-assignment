import { View } from "react-native"
import { Label } from "../../atoms/Label/Label"
import { Input } from "../../atoms/Input/Input"
import { InputWithLabelProps } from "./InputWithLabel.type"

const InputWithLabel: React.FC<InputWithLabelProps> = ({ label, placeholder, ...props }) => {
    console.log('InputWithLabel props:', props)
    return (
        <View>
            <Label label={label}/>
            <Input 
                placeholder={placeholder}
                {...props}
            />
        </View>
    )
}

export {InputWithLabel}