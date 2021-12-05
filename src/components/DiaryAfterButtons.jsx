/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { usePlateValue } from "@udecode/plate-core";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { dateAtom, isUpdateNow } from "../recoils/diary";
import { deleteArticle } from "../apis/article";

const DiaryAfterButtons = () => {
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [withAnony, setWidthAnony] = useState(false);
    const [wasYes, setWasYes] = useState(false); // NOTE: 이거는 백엔드 작동하면 없앨거임
    const editorValue = usePlateValue();
    const navi = useNavigate();
    const [date, setDate] = useRecoilState(dateAtom);
    const [isUpdate, setIsUpdate] = useRecoilState(isUpdateNow);
    const yearStr = date.getFullYear();
    const monthNum = date.getMonth() + 1;
    const dateNum = date.getDate();
    const monthStr = monthNum < 10 ? `0${monthNum}` : monthNum;
    const dateStr = dateNum < 10 ? `0${dateNum}` : dateNum;
    const numDate = `${yearStr}-${monthStr}-${dateStr}`;

    const cancel = () => {
        console.log("글쓰기 취소");
        navi("/");
    };

    const share = () => {
        console.log("open modal!");
        setIsModalOpened(true);
    };

    const revise = async () => {
        console.log(`글쓰기 수정: ${isUpdate}`);
        setIsUpdate(true);
        navi("/diary/write");
    };

    const deleteDiary = async () => {
        console.log(`삭제: ${numDate}`);
        try {
            deleteArticle(numDate);
        } catch (e) {
            console.log(e);
        }
        localStorage.removeItem(numDate);
        navi("/");
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
            <Modal
                open={isModalOpened}
                onClose={() => {
                    setIsModalOpened(false);
                }}
            >
                <Paper
                    sx={{
                        outline: "none",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        alignItems: "center",
                        maxWidth: 400,
                    }}
                >
                    {wasYes ? (
                        <>
                            <Typography sx={{ mb: 4 }} variant="h5">
                                공개된 글 보러가기!
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    minWidth: 150,
                                }}
                            >
                                <Button
                                    onClick={() => {
                                        alert("공개된 글을 보러갔습니다!");
                                    }}
                                    variant="contained"
                                >
                                    좋아
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsModalOpened(false);
                                        setWasYes(false);
                                    }}
                                >
                                    다음에
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Typography sx={{ mb: 4 }} variant="h5">
                                공유하시겠습니까?
                            </Typography>
                            <Checkbox
                                checked={withAnony}
                                onChange={() => setWidthAnony(!withAnony)}
                            />
                            <Typography sx={{ mb: 4 }} variant="h6">
                                익명으로 공유하기
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    minWidth: 150,
                                }}
                            >
                                <Button
                                    onClick={() => {
                                        setWasYes(true);
                                    }}
                                    variant="contained"
                                >
                                    좋아
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsModalOpened(false);
                                    }}
                                >
                                    싫어
                                </Button>
                            </Box>
                        </>
                    )}
                </Paper>
            </Modal>
        </>
    );
};

export default DiaryAfterButtons;
