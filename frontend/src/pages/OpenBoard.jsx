import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BasicLayout from "../layouts/BasicLayout";

const mockups = [
    {
        date: "2021-11-15",
        text: "안녕",
        emotion: "\u{1F601}",
        article_id: true,
        symped: true,
        num: 42,
    },
    {
        date: "2021-11-16",
        text: "하세요",
        emotion: "\u{1F603}",
        article_id: true,
        symped: true,
        num: 79,
    },
    {
        date: "2021-11-17",
        text: "으윽!",
        emotion: "\u{1F602}",
        article_id: false,
        num: 10,
    },
    {
        date: "2021-11-18",
        text: "잘자라!",
        emotion: "\u{1F604}",
        article_id: false,
        symped: true,
        num: 88,
    },
    {
        date: "2021-11-19",
        text: "쿠쿠!",
        emotion: "\u{1F605}",
        article_id: false,
        num: 12,
    },
];

const UnicodeEmoMap = {
    smile: "\u{1F601}",
    laugh: "\u{1F603}",
    happy: "\u{1F604}",
    cute: "\u{1F606}",
};

const NumHeart = ({ symped, num }) => {
    return (
        <IconButton>
            <Badge color="secondary" badgeContent={num}>
                {symped ? (
                    <FavoriteBorderIcon
                        sx={{ fontSize: 90 }}
                        color="secondary"
                    />
                ) : (
                    <FavoriteBorderIcon sx={{ fontSize: 90 }} />
                )}
            </Badge>
        </IconButton>
    );
};

const OpenBoard = () => {
    const [diaries, setDiaries] = useState([...mockups].reverse());
    const [fromOld, setFromOld] = useState(false);
    const [sympOrder, setSympOrder] = useState(false);
    const [emotionFilter, setEmotionFilter] = useState("all");
    useEffect(() => {
        console.log("글 받아오기");
        // 여기서 받아와서 diaries 에 set해주세요.
    }, []);

    useEffect(() => {
        if (sympOrder) {
            // if (fromOld) {
            //     setDiaries(mockups.filter((diary) => diary));
            // } else {
            //     setDiaries(mockups.filter((diary) => diary).reverse());
            // }
        } else {
            if (fromOld) {
                setDiaries(mockups);
            } else {
                setDiaries([...mockups].reverse());
            }
        }
    }, [sympOrder, fromOld]);

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
                                value={sympOrder}
                                onChange={() => {
                                    setSympOrder(!sympOrder);
                                }}
                            />
                        }
                        label="공감 많은순"
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
                                backgroundColor: "primary.light",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <NumHeart
                                symped={diary.symped}
                                num={diary.num ?? 0}
                            />
                            <Typography variant="body1">
                                {diary.text}
                            </Typography>
                            <Box
                                sx={{
                                    position: "absolute",
                                    right: 0,
                                    top: 0,
                                    p: 3,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography variant="h6">
                                    {diary.date}
                                </Typography>

                                <Typography
                                    sx={{ textAlign: "right" }}
                                    variant="h6"
                                >
                                    {diary.emotion}
                                </Typography>
                            </Box>
                        </Paper>
                    );
                })}
            </Grid>
        </BasicLayout>
    );
};

export default OpenBoard;
