import React, { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import {
    dateAtom,
    isAnony as isatom,
    emotion as emoatom,
    isSharable,
} from "../recoils/diary";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import BasicLayout from "../layouts/BasicLayout";

import ReadonlyEditor from "../components/ReadonlyEditor";
import DiaryAfterButtons from "../components/DiaryAfterButtons";
import DiaryListDropdown from "../components/DiaryListDropdown";
import { readArticle, updateEmotion } from "../apis/article";

const DiaryDetails = () => {
    const [date, setDate] = useRecoilState(dateAtom);
    const [withAnony, setWithAnony] = useRecoilState(isatom);
    const [emotion, setEmotion] = useRecoilState(emoatom);
    const [sharability, setSharability] = useRecoilState(isSharable);
    const [content, setContent] = useState("");

    const yearStr = date.getFullYear();
    const monthNum = date.getMonth() + 1;
    const dateNum = date.getDate();
    const monthStr = monthNum < 10 ? `0${monthNum}` : monthNum;
    const dateStr = dateNum < 10 ? `0${dateNum}` : dateNum;
    const numDate = `${yearStr}-${monthStr}-${dateStr}`;
    const otherNumDate = `${yearStr}${monthStr}${dateStr}`;

    useEffect(() => {
        const fetchData = async () => {
            const article = await readArticle(otherNumDate);
            setSharability(article.is_sharable);
            setContent(article.text);
        };
        try {
            fetchData();
        } catch (e) {
            console.log(e);
            alert(
                "Warning: 공유가능여부가 무시되었습니다! 무조건 공유가 가능하게 됩니다."
            );
            setSharability(true);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const article = await updateEmotion(otherNumDate, emotion);
        };
        try {
            fetchData();
        } catch (e) {
            console.log(e);
            alert(
                "Warning: 이모지 업데이트가 안됩니다! AI가 분석한 당신의 감정을 회피하지 마십시오."
            );
        }
    }, [emotion]);

    return (
        <BasicLayout>
            <Grid item xs={12}>
                <DiaryListDropdown
                    emotionFilter={emotion}
                    setEmotionFilter={setEmotion}
                    isNoAll
                />
                <IconButton
                    onClick={(e) => {
                        if (!sharability) {
                            alert(
                                "비방/욕설이 포함되어 있어 공유할 수 없습니다!"
                            );
                        } else {
                            setWithAnony(!withAnony);
                        }
                    }}
                >
                    {withAnony ? <LockIcon /> : <LockOpenIcon />}
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                <Paper
                    sx={{
                        width: "100%",
                        height: 530,
                        overflow: "scroll",
                        position: "relative",
                        p: 4,
                    }}
                    elevation={5}
                >
                    <Typography variant="h4">{`${yearStr}년 ${monthNum}월 ${dateNum}일`}</Typography>
                    <ReadonlyEditor content={content} id={numDate} />
                </Paper>
            </Grid>
            <Grid
                item
                xs={12}
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <DiaryAfterButtons />
            </Grid>
        </BasicLayout>
    );
};

export default DiaryDetails;
