import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { photo as ptatom, nickname as nkatom } from "../recoils/userInfo";
import AppHeader from "../components/AppHeader";
import BasicEditor from "../components/BasicEditor";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const Main = () => {
    const [nickname, setNickname] = useRecoilState(nkatom);
    const [photo, setPhoto] = useRecoilState(ptatom);
    const navigate = useNavigate();

    useEffect(() => {
        const p = localStorage.getItem("photo");
        const ni = localStorage.getItem("nickname");

        if (p && ni) {
            setPhoto(p);
            setNickname(ni);
            return;
        }
        navigate("/signin");
    }, []);

    useEffect(() => {
        const p = localStorage.getItem("photo");
        const ni = localStorage.getItem("nickname");

        if (p && ni) {
            setPhoto(p);
            setNickname(ni);
            return;
        }
        navigate("/signin");
    }, [nickname, photo]);

    return (
        <>
            <AppHeader />
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 5,
                }}
            >
                <Paper
                    sx={{
                        maxWidth: 600,
                        maxHeight: 600,
                        overflow: "scroll",
                    }}
                    elevation={5}
                >
                    <BasicEditor />
                </Paper>
            </Box>
        </>
    );
};

export default Main;
