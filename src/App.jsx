//이상훈 - 현재 사용하지 않는 라이브러리는 주석처리 하였습니다.
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import AppHeader from "./components/AppHeader";
import Main from "./pages/Main";
import FOF from "./pages/FOF";

const App = () => {
    return (
        <>
            <CssBaseline />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="*" element={<FOF />} />
            </Routes>
        </>
    );
};

export default App;
