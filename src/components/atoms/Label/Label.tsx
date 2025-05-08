import { Text } from "react-native"
import { LabelProps } from "./Label.type"
import { useTheme } from "../../../store/themeContext"
import { labelStyles } from "./Label.style"
const Label : React.FC<LabelProps> = ({label, style}) => {
    const {theme} = useTheme()
    const styles = labelStyles(theme)
    return (
        <Text style={[style ,styles.label]}>
            {label}
        </Text>
    )
}

export {Label}
