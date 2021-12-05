/* eslint-disable no-unused-vars */
import React from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { usePlateValue } from "@udecode/plate-core";
import Button from "@mui/material/Button";
import { dateAtom, isUpdateNow } from "../recoils/diary";
import { createArticle, updateArticle } from "../apis/article";

const DiaryWriteButtons = () => {
    const editorValue = usePlateValue();
    const navi = useNavigate();
    const [date, setDate] = useRecoilState(dateAtom);
    const [isUpdating, setIsUpdating] = useRecoilState(isUpdateNow);

    const cancel = () => {
        console.log("글쓰기 취소");
        navi("/");
    };

    const submit = async () => {
        console.log("글쓰기 제출");
        const contentString = JSON.stringify(editorValue);
        const yearStr = date.getFullYear();
        const monthNum = date.getMonth() + 1;
        const dateNum = date.getDate();
        const monthStr = monthNum < 10 ? `0${monthNum}` : monthNum;
        const dateStr = dateNum < 10 ? `0${dateNum}` : dateNum;
        const numDate = `${yearStr}-${monthStr}-${dateStr}`;

        // localStorage.setItem("diaryContent", contentString);
        localStorage.setItem(numDate, contentString);

        try {
            if (isUpdating) {
                const response = await updateArticle(numDate, contentString);
            } else {
                const response = await createArticle({
                    text: contentString,
                    date: Number(numDate),
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    const forceToNext = async () => {
        try {
            await submit();
        } catch (e) {
        } finally {
            navi("/diary/done");
        }
    };

    return (
        <>
            <Button variant="contained" onClick={cancel}>
                취소
            </Button>
            <Button color="secondary" variant="contained" onClick={forceToNext}>
                강제로 제출 후 화면으로
            </Button>
            <Button variant="contained" onClick={submit}>
                제출
            </Button>
        </>
    );
};

export default DiaryWriteButtons;
