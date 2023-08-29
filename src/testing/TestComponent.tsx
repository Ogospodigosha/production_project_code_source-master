import React from 'react';
import ThemeProvider from "../theme/ThemeProvider";
import AuthWindow from "../AuthWindow/AuthWindow";

const TestComponent = () => {
    return (
        <ThemeProvider>
            <AuthWindow/>
        </ThemeProvider>
    );
};

export default TestComponent;
