import { StyleProp, TextStyle, TextInputProps } from "react-native"

export interface InputProps {
    placeholder?: string
    style?: object
    value: string
    onChange: (text: string) => void
    onBlur: () => void
  }
  