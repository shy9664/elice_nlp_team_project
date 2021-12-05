import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import BasicLayout from "../layouts/BasicLayout";

const mockups = [
    {
        date: "2021-11-15",
        text: "아주 많은...",
        emotion: "\u{1F601}",
        is_shared: true,
    },
    {
        date: "2021-11-16",
        text: "내용돌...",
        emotion: "\u{1F603}",
        is_shared: true,
    },
    {
        date: "2021-11-17",
        text: "굴러가유...",
        emotion: "\u{1F602}",
        is_shared: false,
    },
    {
        date: "2021-11-18",
        text: "백엔드가 없어서",
        emotion: "\u{1F604}",
        is_shared: false,
    },
    {
        date: "2021-11-19",
        text: "한계가 있어요.",
        emotion: "\u{1F605}",
        is_shared: false,
    },
    {
        date: "2021-11-20",
        text: "화이팅!",
        emotion: "\u{1F606}",
        is_shared: true,
    },
];

const UnicodeEmoMap = {
    smile: "\u{1F601}",
    laugh: "\u{1F603}",
    happy: "\u{1F604}",
    cute: "\u{1F606}",
};

const DiaryList = () => {
    const [diaries, setDiaries] = useState([...mockups].reverse());
    const [fromOld, setFromOld] = useState(false);
    const [isPublic, setIsPublic] = useState(false);
    const [emotionFilter, setEmotionFilter] = useState("all");
    useEffect(() => {
        console.log("글 받아오기");
        // 여기서 받아와서 diaries 에 set해주세요.
    }, []);

    useEffect(() => {
        if (isPublic) {
            if (fromOld) {
                setDiaries(mockups.filter((diary) => diary.is_shared));
            } else {
                setDiaries(
                    mockups.filter((diary) => diary.is_shared).reverse()
                );
            }
        } else {
            if (fromOld) {
                setDiaries(mockups);
            } else {
                setDiaries([...mockups].reverse());
            }
        }
    }, [isPublic, fromOld]);

    return (
        <BasicLayout>
            <Grid item xs={12}>
                <Box>
                    <InputLabel id="emotion-select-label">감정</InputLabel>
                    <Select
                        labelId="emotion-select-label"
                        id="emotion-select"
                        value={emotionFilter}
                        onChange={(e) => setEmotionFilter(e.target.value)}
                        sx={{ minWidth: 200, mr: 2 }}
                    >
                        <MenuItem value={"all"}>All</MenuItem>
                        <MenuItem value={"smile"}>{"\u{1F601}"}</MenuItem>
                        <MenuItem value={"laugh"}>{"\u{1F603}"}</MenuItem>
                        <MenuItem value={"happy"}>{"\u{1F604}"}</MenuItem>
                        <MenuItem value={"cute"}>{"\u{1F606}"}</MenuItem>
                    </Select>

                    <FormControlLabel
                        control={
                            <Checkbox
                                value={fromOld}
                                onChange={() => {
                                    setFromOld(!fromOld);
                                }}
                            />
                        }
                        label="오래된것부터보기"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={isPublic}
                                onChange={() => {
                                    setIsPublic(!isPublic);
                                }}
                            />
                        }
                        label="공개된 글"
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sx={{ maxHeight: 630, overflow: "scroll" }}>
                {diaries.map((diary) => {
                    if (
                        emotionFilter !== "all" &&
                        UnicodeEmoMap[emotionFilter] !== diary.emotion
                    ) {
                        // eslint-disable-next-line array-callback-return
                        return;
                    }
                    return (
                        <Paper
                            key={diary.date}
                            sx={{
                                m: 2,
                                minHeight: 100,
                                p: 2,
                                position: "relative",
                            }}
                        >
                            <Typography variant="h6">
                                {diary.date} {diary.emotion}
                            </Typography>
                            <Typography variant="body1">
                                {diary.text}
                            </Typography>
                            <Box
                                sx={{
                                    position: "absolute",
                                    right: 0,
                                    top: 0,
                                    p: 3,
                                }}
                            >
                                {diary.is_shared ? (
                                    <LockOpenIcon />
                                ) : (
                                    <LockIcon />
                                )}
                            </Box>
                        </Paper>
                    );
                })}
            </Grid>
        </BasicLayout>
    );
};

export default DiaryList;
