import { InputProps } from '../../atoms/Input/Input.type';
import { StyleProp, TextStyle } from 'react-native';

export interface InputWithLabelProps extends InputProps {
    label: string;
    placeholder?: string;
    style?: StyleProp<TextStyle>;
    multiline?: boolean;
    numberOfLines?: number;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}
