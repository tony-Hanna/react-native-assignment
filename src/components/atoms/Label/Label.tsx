import { Text } from "react-native"
import { LabelProps } from "./Label.type"
const Label : React.FC<LabelProps> = ({label, style}) => {
    return (
        <Text style={style}>
            {label}
        </Text>
    )
}

export {Label}
