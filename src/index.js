//이상훈 - 현재 사용하지 않는 라이브러리는 주석처리 하였습니다.
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
