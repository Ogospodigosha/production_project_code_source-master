import React from "react";
import {render} from "react-dom";

import AuthWindowWrapper from "./components/EntryComponent/AuthWindowWrapper";
import {Theme} from "./theme/ThemeContext";



render(
    <AuthWindowWrapper currentTheme={'dark' as Theme} backUrl={'https://develop.onbank.online'} authTypeProps={'MTS_ID'} />
    // <></>
,
        document.getElementById('root')
)
