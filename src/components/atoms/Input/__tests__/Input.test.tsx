import { Input } from "../Input";
import { ThemeProvider } from "../../../../store/themeContext";
import { render, fireEvent } from "@testing-library/react-native";
describe('input component', () => {
    const mockProps = {
        value: '',
        onChange: jest.fn(),
        onBlur: jest.fn(),
        placeholder: 'Enter text'
    };

    it('renders Input correctly', () => {
        const { getByTestId, getByPlaceholderText } = render(
            <ThemeProvider>
                <Input {...mockProps} />
            </ThemeProvider>
        );

        // Check if component renders
        expect(getByTestId('custom-input')).toBeTruthy();
        // Check if placeholder is correct
        expect(getByPlaceholderText('Enter text')).toBeTruthy();
    });

    it('handles user input correctly', () => {
        const { getByTestId } = render(
            <ThemeProvider>
                <Input {...mockProps} />
            </ThemeProvider>
        );

        const input = getByTestId('custom-input');
        
        // Test onChange
        fireEvent.changeText(input, 'test input');
        expect(mockProps.onChange).toHaveBeenCalledWith('test input');

        // Test onBlur
        fireEvent(input, 'blur');
        expect(mockProps.onBlur).toHaveBeenCalled();

    });
})
