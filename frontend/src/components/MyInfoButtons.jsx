/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { photo as ptatom, nickname as nkatom } from "../recoils/userInfo";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const MyInfoButtons = () => {
    const [nickname, setNickname] = useRecoilState(nkatom);
    const [photo, setPhoto] = useRecoilState(ptatom);
    const navi = useNavigate();
    const revise = () => {
        console.log("수정하였습니다.");
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("photo", photo);
    };
    const toHome = () => {
        console.log("홈으로");
        navi("/");
    };
    return (
        <>
            <Button
                sx={{ mr: 1 }}
                onClick={() => toHome()}
                variant="contained"
                color="secondary"
            >
                <Typography>홈으로</Typography>
            </Button>
            <Button
                onClick={() => revise()}
                variant="contained"
                color="secondary"
            >
                <Typography>수정하기</Typography>
            </Button>
        </>
    );
};

export default MyInfoButtons;
