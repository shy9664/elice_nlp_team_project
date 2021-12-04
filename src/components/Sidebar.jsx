import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { photo as ptatom, nickname as nkatom } from "../recoils/userInfo";
import { useNavigate } from "react-router";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import MyInfoButtons from "./MeButtons";

const pagesInfo = [
    {
        text: "일기 쓰기",
        url: "/diary/write",
    },
    {
        text: "목록",
        url: "/diary",
    },
    {
        text: "공감한 게시글",
        url: "/diary/symp",
    },
    {
        text: "열린게시판",
        url: "/diary/opened",
    },
];

const Sidebar = () => {
    const navi = useNavigate();
    const [nickname, setNickname] = useRecoilState(nkatom);
    const [photo, setPhoto] = useRecoilState(ptatom);

    const naviHandlerFunc = (path) => {
        return () => {
            navi(path);
        };
    };

    useEffect(() => {
        const p = localStorage.getItem("photo");
        const ni = localStorage.getItem("nickname");

        if (p && ni) {
            setPhoto(p);
            setNickname(ni);
            return;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Box
                sx={{
                    height: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <Avatar
                    variant="rounded"
                    alt="avatar profile"
                    src={photo}
                    sx={{ width: "10vw", height: "10vw", bgcolor: "#b2cefe" }}
                />
                <Typography sx={{ mt: 3, textAlign: "center" }} variant="h4">
                    {nickname}
                </Typography>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    mb: 4,
                }}
            >
                <MyInfoButtons />
            </Box>

            <List>
                {pagesInfo.map((pInfo) => {
                    return (
                        <ListItem key={pInfo.text} disablePadding>
                            <ListItemButton
                                onClick={naviHandlerFunc(pInfo.url)}
                            >
                                <ListItemText primary={pInfo.text} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
};

export default Sidebar;
