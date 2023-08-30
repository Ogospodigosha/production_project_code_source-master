import React, {FC} from 'react';
import ThemeProvider from "../theme/ThemeProvider";
import AuthWindow from "../AuthWindow/AuthWindow";
import {Theme} from "../theme/ThemeContext";

type PropsType = {
    currentTheme: Theme
}


const TestComponent: FC<PropsType> = ({currentTheme}) => {
    return (
        <ThemeProvider currentTheme={currentTheme}>
            <AuthWindow/>
        </ThemeProvider>
    );
};

export default TestComponent;
