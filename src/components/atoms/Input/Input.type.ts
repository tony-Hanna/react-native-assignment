import { StyleProp, TextStyle } from 'react-native';

export interface InputProps {
    placeholder?: string
    style?: StyleProp<TextStyle>
    value: string
    onChange: (text: string) => void
    onBlur: () => void
    editable?: boolean
    multiline?: boolean
    numberOfLines?: number
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad'
}
  