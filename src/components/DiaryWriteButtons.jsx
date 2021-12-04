import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const DiaryWriteButtons = () => {
    const navi = useNavigate();
    const cancel = () => {
        console.log("글쓰기 취소");
        navi("/");
    };
    const submit = () => {
        console.log("글쓰기 제출");
    };
    return (
        <>
            <Button variant="contained" onClick={cancel}>
                취소
            </Button>
            <Button variant="contained" onClick={submit}>
                제출
            </Button>
        </>
    );
};

export default DiaryWriteButtons;
