import { Text } from "react-native"
import { LabelProps } from "./Label.type"
import { labelStyles } from "./Label.style"
const Label : React.FC<LabelProps> = ({label, style}) => {
    return (
        <Text style={[style ,labelStyles.label]}>
            {label}
        </Text>
    )
}

export {Label}
