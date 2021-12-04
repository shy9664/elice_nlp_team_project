import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import BasicEditor from "../components/BasicEditor";
import DiaryDateInput from "../components/DiaryDateInput";
import DiaryWriteButtons from "../components/DiaryWriteButtons";

import BasicLayout from "../layouts/BasicLayout";

const DiaryWrite = () => {
    return (
        <BasicLayout>
            <Grid item>
                <DiaryDateInput />
            </Grid>
            <Grid item>
                <Paper
                    sx={{
                        width: "100%",
                        height: 530,
                        overflow: "scroll",
                        position: "relative",
                    }}
                    elevation={5}
                >
                    <BasicEditor />
                </Paper>
            </Grid>
            <Grid
                item
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "flex-end",
                }}
            >
                <DiaryWriteButtons />
            </Grid>
        </BasicLayout>
    );
};

export default DiaryWrite;
