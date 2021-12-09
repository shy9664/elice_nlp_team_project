import React, { useState } from "react";
import { useRecoilState } from "recoil";
import TextField from "@mui/material/TextField";
import { photo as ptatom, nickname as nkatom } from "../recoils/userInfo";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

const MyInfo = () => {
    const [nickname, setNickname] = useRecoilState(nkatom);
    const [photo, setPhoto] = useRecoilState(ptatom);

    const [pw, setPw] = useState("");

    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                mb: 4,
            }}
        >
            <Avatar
                variant="rounded"
                alt="avatar profile"
                src={photo}
                sx={{
                    width: "10vw",
                    height: "10vw",
                    bgcolor: "#b2cefe",
                    mb: 2,
                }}
            />
            <TextField
                sx={{ m: 2 }}
                label="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                variant="filled"
            />
            <TextField
                sx={{ m: 2 }}
                label="이메일"
                disabled
                defaultValue="immutable@email.com"
                variant="filled"
            />
            <TextField
                type="password"
                sx={{ m: 2 }}
                label="비밀번호"
                variant="filled"
                value={pw}
                onChange={() => setPw()}
            />
        </Box>
    );
};

export default MyInfo;
