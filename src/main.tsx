import React from "react";
import {render} from "react-dom";

import AuthWindow from "./AuthWindow/AuthWindow";
import ThemeProvider from "./theme/ThemeProvider";
import TestComponent from "./testing/TestComponent";
import {Theme} from "./theme/ThemeContext";



render(
    <TestComponent currentTheme={'dark' as Theme} authTypeProps={'MTS_ID'}/>
    // <></>
,
        document.getElementById('root')
)
