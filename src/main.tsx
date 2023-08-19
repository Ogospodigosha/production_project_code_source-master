import React from "react";
import {render} from "react-dom";
import {Counter} from "./index";
import AuthWindow from "./AuthWindow/AuthWindow";



render(
        <AuthWindow/>,
        document.getElementById('root')
)
