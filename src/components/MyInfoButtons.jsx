import React from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { photo as ptatom, nickname as nkatom } from "../recoils/userInfo";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const MyInfoButtons = () => {
    const [nickname, setNickname] = useRecoilState(nkatom);
    const [photo, setPhoto] = useRecoilState(ptatom);
    const navi = useNavigate();
    const logout = () => {
        console.log("로그아웃되었습니다.");
        localStorage.clear();
        setNickname("");
        setPhoto("");
        setTimeout(() => {
            navi("/signin");
        }, 200);
    };
    return (
        <>
            <Button sx={{ mr: 1 }} variant="contained" color="secondary">
                <Typography>내 정보</Typography>
            </Button>
            <Button
                onClick={() => logout()}
                variant="contained"
                color="secondary"
            >
                <Typography>로그아웃</Typography>
            </Button>
        </>
    );
};

export default MyInfoButtons;
