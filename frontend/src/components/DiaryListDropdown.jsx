import React from "react";

import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

/**
 * "all":
    emotion = [
        "fear",
        "surprise",
        "anger",
        "sadness",
        "neutrality",
        "happiness",
        "disgust",
    ]
    */
export const UnicodeEmoMap = {
    neutrality: "\u{1F601}",
    fear: "\u{1F628}",
    happiness: "\u{1F603}",
    surprise: "\u{1F62E}",
    anger: "\u{1F620}",
    sadness: "\u{1F61E}",
    disgust: "\u{1F922}",
};

const DiaryListDropdown = ({ emotionFilter, setEmotionFilter, isNoAll }) => {
    return (
        <>
            <InputLabel id="emotion-select-label">감정</InputLabel>
            <Select
                labelId="emotion-select-label"
                id="emotion-select"
                value={emotionFilter}
                onChange={(e) => setEmotionFilter(e.target.value)}
                sx={{ minWidth: 200, mr: 2 }}
            >
                {!isNoAll && <MenuItem value={"all"}>All</MenuItem>}
                <MenuItem value={"smile"}>
                    {"\u{1F601}"}
                    {" 즐거움"}
                </MenuItem>
                <MenuItem value={"normal"}>
                    {"\u{1F603}"}
                    {" 평이"}
                </MenuItem>
                <MenuItem value={"happy"}>
                    {"\u{1F604}"}
                    {" 행복"}
                </MenuItem>
                <MenuItem value={"funny"}>
                    {"\u{1F606}"}
                    {" 재밌음"}
                </MenuItem>
                <MenuItem value={"sad"}>
                    {"\u{1F61E}"}
                    {" 슬픔"}
                </MenuItem>
                <MenuItem value={"angry"}>
                    {"\u{1F620}"}
                    {" 분노"}
                </MenuItem>
            </Select>
        </>
    );
};

export default DiaryListDropdown;
