import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./theme";
// import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import dotenv from "dotenv";
import "./index.css";

// axios.defaults.withCredentials = true;
dotenv.config();

ReactDOM.render(
    <BrowserRouter>
        <RecoilRoot>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </RecoilRoot>
    </BrowserRouter>,
    document.querySelector("#root")
);
