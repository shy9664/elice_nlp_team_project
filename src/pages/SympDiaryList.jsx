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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BasicLayout from "../layouts/BasicLayout";

const mockups = [
    {
        date: "2021-11-15",
        text: "많고 많은",
        emotion: "\u{1F601}",
        article_id: true,
    },
    {
        date: "2021-11-16",
        text: "내가 제일 잘났지",
        emotion: "\u{1F603}",
        article_id: true,
    },
    {
        date: "2021-11-17",
        text: "안녕! 생선대가리!",
        emotion: "\u{1F602}",
        article_id: false,
    },
    {
        date: "2021-11-18",
        text: "이제 우리 둘뿐이네!",
        emotion: "\u{1F604}",
        article_id: false,
    },
    {
        date: "2021-11-19",
        text: "콰광!",
        emotion: "\u{1F605}",
        article_id: false,
    },
    {
        date: "2021-11-20",
        text: "진보의 날!",
        emotion: "\u{1F606}",
        article_id: true,
    },
];

const UnicodeEmoMap = {
    smile: "\u{1F601}",
    laugh: "\u{1F603}",
    happy: "\u{1F604}",
    cute: "\u{1F606}",
};

const Heart = () => {
    const [symped, setSymped] = useState(false);
    return (
        <IconButton
            onClick={() => {
                setSymped(!symped);
            }}
        >
            {symped ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
    );
};

const SympDiaryList = () => {
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
                                <Heart />
                            </Box>
                        </Paper>
                    );
                })}
            </Grid>
        </BasicLayout>
    );
};

export default SympDiaryList;
