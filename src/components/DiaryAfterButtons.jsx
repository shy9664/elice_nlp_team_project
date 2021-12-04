/* eslint-disable no-unused-vars */
import React from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { usePlateValue } from "@udecode/plate-core";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { dateAtom } from "../recoils/diary";
import { updateArticle } from "../apis/article";

const DiaryAfterButtons = () => {
    const editorValue = usePlateValue();
    const navi = useNavigate();
    const [date, setDate] = useRecoilState(dateAtom);

    const cancel = () => {
        console.log("글쓰기 취소");
        navi("/");
    };

    const share = () => {
        console.log("open modal!");
    };

    const revise = async () => {
        console.log("글쓰기 수정");
        navi("/diary/write");
    };

    const deleteDiary = async () => {
        console.log("삭제");
    };

    return (
        <>
            <Button variant="contained" onClick={cancel}>
                취소
            </Button>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" onClick={share} sx={{ mr: 1 }}>
                    공유
                </Button>
                <Button variant="contained" onClick={revise} sx={{ mr: 1 }}>
                    수정
                </Button>
                <Button variant="contained" onClick={deleteDiary}>
                    삭제
                </Button>
            </Box>
        </>
    );
};

export default DiaryAfterButtons;
