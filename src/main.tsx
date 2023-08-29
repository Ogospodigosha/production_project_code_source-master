import React from "react";
import {render} from "react-dom";

import AuthWindow from "./AuthWindow/AuthWindow";
import ThemeProvider from "./theme/ThemeProvider";
import TestComponent from "./testing/TestComponent";



render(
    <TestComponent/>
,
        document.getElementById('root')
)
