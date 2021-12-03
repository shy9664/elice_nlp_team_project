import React from "react";
import { useRecoilState } from "recoil";
import { photo as ptatom, nickname as nkatom } from "../recoils/userInfo";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./Logo";
import { useNavigate } from "react-router";
import { Typography } from "@mui/material";

const AppHeader = () => {
    const navi = useNavigate();
    const [nickname, setNickname] = useRecoilState(nkatom);
    const [photo, setPhoto] = useRecoilState(ptatom);
    const logout = () => {
        console.log("로그아웃되었습니다.");
        localStorage.clear();
        setNickname("");
        setPhoto("");
        setTimeout(() => {
            navi("/signin");
        }, 500);
    };
    return (
        <AppBar sx={{ position: "sticky" }}>
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        width: 150,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "white",
                    }}
                    onClick={() => {
                        navi("/");
                    }}
                >
                    <Logo />
                </Button>
                <Box>
                    <Button
                        sx={{ mr: 1 }}
                        variant="contained"
                        color="secondary"
                    >
                        <Typography>내 정보</Typography>
                    </Button>
                    <Button
                        onClick={() => logout()}
                        variant="contained"
                        color="secondary"
                    >
                        <Typography>로그아웃</Typography>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AppHeader;
