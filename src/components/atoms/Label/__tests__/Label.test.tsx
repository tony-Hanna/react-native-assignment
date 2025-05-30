import React from 'react';
import { Label } from '../Label';
import { render } from "@testing-library/react-native";
import { ThemeProvider } from '../../../../store/themeContext';
const props = {
    label: 'some text'
}
it("renders CustomText correctly", () => {
    const { getByText, toJSON } = render(
        <ThemeProvider>
            <Label {...props}/>
        </ThemeProvider>
    );
    expect(getByText('some text')).toBeTruthy()
    expect(toJSON()).toMatchSnapshot()
});
