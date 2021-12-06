import React from "react";

import { useRecoilState } from "recoil";
import { dateAtom } from "../recoils/diary";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import BasicLayout from "../layouts/BasicLayout";

import ReadonlyEditor from "../components/ReadonlyEditor";
import DiaryAfterButtons from "../components/DiaryAfterButtons";

const DiaryDetails = () => {
    const [date, setDate] = useRecoilState(dateAtom);
    const yearStr = date.getFullYear();
    const monthNum = date.getMonth() + 1;
    const dateNum = date.getDate();
    const monthStr = monthNum < 10 ? `0${monthNum}` : monthNum;
    const dateStr = dateNum < 10 ? `0${dateNum}` : dateNum;
    const numDate = `${yearStr}-${monthStr}-${dateStr}`;
    return (
        <BasicLayout>
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
                    <ReadonlyEditor selectedDate={numDate} />
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
