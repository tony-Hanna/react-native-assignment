import { TextInput, TextInputProps } from 'react-native';
import { InputProps } from '../../atoms/Input/Input.type';

export interface InputWithLabelProps extends InputProps {
    label: string;
    placeholder: string;
}
