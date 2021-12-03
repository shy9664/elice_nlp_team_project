import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Logo from "../components/Logo";
import signin from "../apis/signin";

import { useRecoilState } from "recoil";
import { photo as ptatom, nickname as nkatom } from "../recoils/userInfo";

const SignIn = () => {
    const [nickname, setNickname] = useRecoilState(nkatom);
    const [photo, setPhoto] = useRecoilState(ptatom);

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        event.stopPropagation();
        const jsonData = {
            email: data.get("email"),
            password: data.get("password"),
        };

        try {
            const userInfo = await signin(jsonData);
        } catch (e) {
            console.log(e);
        }
    };

    const forceToLogin = () => {
        setPhoto("something");
        setNickname("별명입니다.");
        localStorage.setItem("photo", "something");
        localStorage.setItem("nickname", "별명입니다.");
        setTimeout(() => {
            navigate("/");
        }, 500);
    };

    return (
        <Container
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: "100vw",
                    height: "100vh",
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1633474601643-a321174fd8fd)",
                    backgroundSize: "cover",
                    opacity: 0.6,
                }}
            ></Box>
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 4,
                    maxWidth: 400,
                    zIndex: 2,
                }}
                elevation={3}
            >
                <Logo />
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="이메일"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="비밀번호"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        로그인
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/">
                                <Typography variant="body2">
                                    비밀번호를 잊으셨나요?
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/signup">
                                <Typography variant="body2">
                                    회원가입하기
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <Button
                variant="contained"
                sx={{ position: "absolute", right: 0, top: 0, m: 2 }}
                onClick={(e) => {
                    navigate("/signup");
                }}
            >
                Sign Up
            </Button>
            {/* 화면만들기 및 테스트용 */}
            <Button
                variant="contained"
                sx={{ position: "absolute", left: 0, top: 0, m: 2 }}
                onClick={(e) => {
                    forceToLogin();
                    navigate("/");
                }}
            >
                강제인증
            </Button>
        </Container>
    );
};

export default SignIn;
