import { InputProps } from '../../atoms/Input/Input.type';

export interface InputWithLabelProps extends InputProps {
    label: string;
    placeholder?: string;
    secureTextEntry?: boolean;
}
