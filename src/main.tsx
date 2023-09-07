import React from "react";
import {render} from "react-dom";

import TestComponent from "./testing/TestComponent";
import {Theme} from "./theme/ThemeContext";



render(
    <TestComponent currentTheme={'dark' as Theme} />
    // <></>
,
        document.getElementById('root')
)
