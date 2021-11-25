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
    const foundUser = users.find(user => user.email === formData.email && user.password === formData.password)
    
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
        <strong>비밀번호:{password}</strong>
      </p>
      <Link to="/">로그아웃</Link>
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