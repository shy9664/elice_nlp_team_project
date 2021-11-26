import React from "react";
import {
  Redirect,
  Link,
  Switch,
  BrowserRouter,
  Route,
  useHistory,
  useLocation,
} from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ListPage from "../pages/ListPage";
import WritePage from "../pages/WritePage";


const users = [];

export default function UserLogin() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>

        <Route exact path="/login">
          <LoginPage />
        </Route>

        <Route exact path="/detail">
          <UserDetailPage />
        </Route>
        
        <Route exact path="/register">
            <RegisterPage />
        </Route>

        <Route exact path="/list">
          <ListPage />
        </Route>

        <Route exact path="/write">
          <WritePage />
        </Route>
        
      </Switch>
    </BrowserRouter>
  );
}

function HomePage() {
  return (
    <div>
      <h2>무드무드 메인</h2>
      <div>
        <Link to="/login">로그인</Link>
      </div>
    </div>
  );
}

function LoginPage() {
  const history = useHistory()
  
  const handleSubmit = (formData) => {
    const foundUser = users.find(user => user.email === formData.email && user.password === formData.password && user.nickname === formData.nickname)
    
    if (!foundUser) return
    history.push(`/detail?email=${formData.email}&password=${formData.password}`)
  }
  
  return (
    <div>
      <h2>로그인 페이지</h2>
      <LoginForm onSubmit={handleSubmit} />
      <div>
        <ul>
          <li>
            <Link to="/">메인으로</Link>
          </li>

          <li>
            <Link to="/register">회원가입</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

function UserDetailPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const email = searchParams.get("email");
  const password = searchParams.get("password");
  const nickname = searchParams.get("nickmane");
  const password2 = searchParams.get("password2");

  if (!email || !password) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h2>유저 페이지</h2>
      <p>
        <h3>유저 정보</h3>
        <em>이메일:{email}</em>
        <br />
        <strong>비밀번호:{password}</strong> <br />
        <strong>비밀번호 확인:{password2}</strong> <br />
        <p>닉네임:{nickname}</p>
      </p>
      <Link to="/">로그아웃</Link>
      <br />
      <Link to="/list">글쓰기</Link>
    </div>
  );
}

function RegisterPage() {
  const history = useHistory();

  const handleSubmit = (formData) => {
    users.push(formData);
    history.push('/login')
  };

  return (
    <div>
      <h2>회원가입 페이지</h2>
      <RegisterForm onSubmit={handleSubmit} />
      <div>
        <ul>
          <li>
            <Link to="/">메인으로</Link>
          </li>

          <li>
            <Link to="/login">로그인</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}