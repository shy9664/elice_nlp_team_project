import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRecoilState } from "recoil";
import { selectedDateMainAtom } from "../recoils/cal";
import { useNavigate } from "react-router";
import ReadonlyEditor from "./ReadonlyEditor";

const MainDiaries = () => {
    const navi = useNavigate();
    const [date, setDate] = useRecoilState(selectedDateMainAtom);
    const [fullDate, setFullDate] = useState("");
    const [fullDateString, setFullDateString] = useState("");
    const [contentData, setContentData] = useState("");

    useEffect(() => {
        const yearStr = date.getFullYear();
        const monthNum = date.getMonth() + 1;
        const dateNum = date.getDate();
        const monthStr = monthNum < 10 ? `0${monthNum}` : monthNum;
        const dateStr = dateNum < 10 ? `0${dateNum}` : dateNum;
        const numDate = `${yearStr}-${monthStr}-${dateStr}`;
        const strDate = `${yearStr}년 ${monthNum}월 ${dateNum}일`;
        setFullDateString(strDate);
        setFullDate(numDate);
    }, [date]);

    useEffect(() => {
        const next = localStorage.getItem(fullDate);
        next && next !== contentData
            ? setContentData("loading")
            : setContentData("");
        setTimeout(() => {
            setContentData(next);
        }, 10);
    }, [fullDate]);

    // useEffect(() => {}, [contentData]);

    const goWriteDiary = () => {
        navi("/diary/write");
    };
    return (
        <>
            <Typography variant="h4">{fullDateString}</Typography>
            {contentData === "loading" ? (
                <Box sx={{ height: 200 }}></Box>
            ) : contentData ? (
                <>
                    <ReadonlyEditor selectedDate={contentData} isDataContent />
                </>
            ) : (
                <>
                    <Typography sx={{ mt: 1, mb: 1 }}>
                        일기가 없어요ㅠㅠ
                    </Typography>
                    <Button
                        onClick={() => goWriteDiary()}
                        variant="contained"
                        // color="secondary"
                    >
                        <Typography>{">>"} 오늘이라도 일기를 쓰자!</Typography>
                    </Button>
                </>
            )}
        </>
    );
};

export default MainDiaries;
