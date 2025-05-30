import React from 'react';
import { CustomText } from "../CustomText";
import { render } from "@testing-library/react-native";
import { ThemeProvider } from '../../../../store/themeContext';
const props = {
    children: 'some text'
}
it("renders CustomText correctly", () => {
    const { getByTestId, getByText } = render(
        <ThemeProvider>
            <CustomText {...props}/>
        </ThemeProvider>
    );

    // check if component is rendered
    expect(getByTestId("custom-text")).toBeTruthy();

    expect(getByText("some text")).toBeTruthy();
});
