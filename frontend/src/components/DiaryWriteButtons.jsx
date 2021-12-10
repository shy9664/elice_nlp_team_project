/* eslint-disable no-unused-vars */
import React from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { usePlateValue } from "@udecode/plate-core";
import Button from "@mui/material/Button";
import {
    dateAtom,
    emotion as emoatom,
    isAnony,
    isSharable,
    isUpdateNow,
} from "../recoils/diary";
import { createArticle, readArticle, updateArticle } from "../apis/article";
import { UnicodeEmoMap } from "./DiaryListDropdown";

const DiaryWriteButtons = () => {
    const editorValue = usePlateValue();
    const navi = useNavigate();
    const [date, setDate] = useRecoilState(dateAtom);
    const [isUpdating, setIsUpdating] = useRecoilState(isUpdateNow);
    const [sharability, setSharability] = useRecoilState(isSharable);
    const [isPrivate, setIsPrivate] = useRecoilState(isAnony);
    const [emotion, setEmotion] = useRecoilState(emoatom);

    const cancel = () => {
        console.log("글쓰기 취소");
        navi("/");
    };

    const submit = async () => {
        console.log("글쓰기 저장");
        const contentString = JSON.stringify(editorValue);
        const yearStr = date.getFullYear();
        const monthNum = date.getMonth() + 1;
        const dateNum = date.getDate();
        const monthStr = monthNum < 10 ? `0${monthNum}` : monthNum;
        const dateStr = dateNum < 10 ? `0${dateNum}` : dateNum;
        const numDate = `${yearStr}-${monthStr}-${dateStr}`;
        const otherNumDate = `${yearStr}${monthStr}${dateStr}`;

        // localStorage.setItem("diaryContent", contentString);
        localStorage.setItem(numDate, contentString);

        // 추가

        try {
            // 처음에 이미 작성된 글이 있는지 확인
            const res = await readArticle(otherNumDate);

            // 있으면 업데이트임
            if (res) {
                setIsUpdating(true);
            }

            let response;
            if (isUpdating) {
                response = await updateArticle(otherNumDate, contentString);
            } else {
                response = await createArticle({
                    text: contentString,
                    date: Number(otherNumDate),
                });
            }
            if (!response) {
                alert("글 작성 및 업데이트가 정상적으로 처리되지 않음!");
                return;
            }
            console.log("글 작성 및 업데이트 됨. 감정 설정 하는 중...");
            // 해당 글을 다시 받음
            const resAgain = await readArticle(otherNumDate);

            if (!resAgain || !resAgain.date) {
                alert(
                    "글 다시 받아오는 과정에서 문제가 생김! 다시 제출해주세요!"
                );
            }

            // 지금 이 글에 대하여...
            setSharability(resAgain.is_sharable);
            setEmotion(resAgain.emotion);
            setIsPrivate(!resAgain.is_shared);

            // 받아온걸로 해줘야하는데..

            // 로컬에서의 코드...
            const wholeInfo = {
                text: contentString,
                date: numDate,
                is_shared: !isPrivate || false,
                emotion: UnicodeEmoMap[emotion] || UnicodeEmoMap["sadness"],
            };

            const prev = localStorage.getItem("diaryContents") || "[]";
            const prevList = JSON.parse(prev);
            const nowList = prevList.filter((ele) => ele.date !== numDate);
            nowList.push(wholeInfo);
            nowList.sort((f, s) => {
                return f.date > s.date ? -1 : 1;
            });
            const nowStr = JSON.stringify(nowList);
            localStorage.setItem("diaryContents", nowStr);

            // 모든 작업이 끝났으므로 상세페이지로
            navi("/diary/done");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Button variant="contained" onClick={cancel}>
                취소
            </Button>
            <Button variant="contained" onClick={submit}>
                저장
            </Button>
        </>
    );
};

export default DiaryWriteButtons;
