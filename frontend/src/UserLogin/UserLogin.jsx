import React from "react";
import {
  Routes,
  BrowserRouter,
  Route,
  Link,
  useLocation,
  Navigate,
  useNavigate
} from "react-router-dom";
import LoginForm from './LoginForm';
import RegisterForm from "./RegisterForm";

const users = [];

export default function UserLogin() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/detail" element={<UserDetailPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

function HomePage() {
  return (
    <div>
      <h2>무드무드무드무드</h2>
      <div>
      <Link to="login">로그인하러가기!</Link>
      </div>
    </div>
  );
}

function LoginPage() {
  const history = useNavigate()
  
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

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  
  
  const email = searchParams.get('email')
  const password = searchParams.get('password')
  
  if (!email || !password) {
    return <Navigate to="/login" />
  }
  
  return (
    <div>
      <h2>유저 정보 페이지</h2>
      <p>
        <h3>유저 정보</h3>
        <em>{email}</em>
        <br />
        <strong>{password}</strong>
      </p>
        <Link to="/">로그아웃</Link>
    </div>
  );
}

function RegisterPage() {
  const history = useNavigate();

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