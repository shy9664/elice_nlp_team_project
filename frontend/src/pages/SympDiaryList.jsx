import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BasicLayout from "../layouts/BasicLayout";
import DiaryListDropdown, {
    UnicodeEmoMap,
} from "../components/DiaryListDropdown";

const mockups = [
    {
        date: "2021-11-15",
        text: "많고 많은",
        emotion: "\u{1F601}",
        article_id: true,
        symped: true,
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
        emotion: "\u{1F620}",
        article_id: false,
    },
    {
        date: "2021-11-18",
        text: "이제 우리 둘뿐이네!",
        emotion: "\u{1F604}",
        article_id: false,
        symped: true,
    },
    {
        date: "2021-11-19",
        text: "콰광!",
        emotion: "\u{1F61E}",
        article_id: false,
        symped: true,
    },
    {
        date: "2021-11-20",
        text: "진보의 날!",
        emotion: "\u{1F606}",
        article_id: true,
    },
];

const Heart = ({ sym }) => {
    const [symped, setSymped] = useState(sym ?? false);
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
    const [emotionFilter, setEmotionFilter] = useState("all");
    useEffect(() => {
        console.log("글 받아오기");
        // 여기서 받아와서 diaries 에 set해주세요.
    }, []);

    useEffect(() => {
        if (fromOld) {
            setDiaries(mockups);
        } else {
            setDiaries([...mockups].reverse());
        }
    }, [fromOld]);

    return (
        <BasicLayout>
            <Grid item xs={12}>
                <Box>
                    {/* 다이어리 감정 드롭다운  */}
                    <DiaryListDropdown
                        emotionFilter={emotionFilter}
                        setEmotionFilter={setEmotionFilter}
                    />
                    {/* 체크박스 오래된 거부터 */}
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
                                <Heart sym={diary.symped} />
                            </Box>
                        </Paper>
                    );
                })}
            </Grid>
        </BasicLayout>
    );
};

export default SympDiaryList;
