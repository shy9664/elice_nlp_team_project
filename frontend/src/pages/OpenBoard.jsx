import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BasicLayout from "../layouts/BasicLayout";
import { readBoard } from "../apis/board";
import DiaryListDropdown, {
    UnicodeEmoMap,
} from "../components/DiaryListDropdown";

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
    const [diaries, setDiaries] = useState([]);
    const [immuDiaries, setImmuDiaries] = useState([]);
    const [fromOld, setFromOld] = useState(false);
    const [emotionFilter, setEmotionFilter] = useState("all");
    useEffect(() => {
        console.log("글 받아오기");
        const fetchData = async () => {
            try {
                const data = await readBoard();
                console.log(data);
                setImmuDiaries(data)
                setDiaries(data);

            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
            if (fromOld) {
                setDiaries(immuDiaries);
            } else {
                setDiaries([...immuDiaries].reverse());
            }
    }, [fromOld]);

    return (
        <BasicLayout>
            <Grid item xs={12}>
                <Box>
                    {/* <InputLabel id="emotion-select-label">감정</InputLabel> */}
                    <DiaryListDropdown
                        emotionFilter={emotionFilter}
                        setEmotionFilter={setEmotionFilter}
                    />

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
                    {/* <FormControlLabel
                        control={
                            <Checkbox
                                value={sympOrder}
                                onChange={() => {
                                    setSympOrder(!sympOrder);
                                }}
                            />
                        }
                        label="공감 많은순"
                    /> */}
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
                                backgroundColor: "secondary.dark",
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
