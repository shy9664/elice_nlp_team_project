import React, { useRef, useState } from "react";
import signup from "../apis/signup";
import { useHistory } from "react-router";


export default function RegisterForm({ onSubmit }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  // 주석처리해둔 부분은 register 등록은 되는데 login이 제대로 작동하지 않아서 임시로 막아뒀습니다 ㅠ
  // const password2Ref = useRef();
  // const nicknameRef = useRef();
  
  
  const history = useHistory()

  const submitForm = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const formData = {
      email,
      password,
      password_check: password,  // 임시
      nickname: '123'  // 임시. unique한 값이므로 테스트할 때 매번 변경해줘야함 
    };

    signup(formData);
    history.push('/login')
  };

  return (
    <div>
      <form>
        <fieldset>
          <label htmlFor="email">이메일</label>
          <input
            
            required ref={emailRef}
            id="email"
            type="email"
            name="email"
            autoComplete="off"
            placeholder="이메일을 입력해주세요."
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">비밀번호</label>
          <input
            required ref={passwordRef}
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
          />
        </fieldset>
  
        {/* <fieldset>
          <label htmlFor="password2">비밀번호 확인</label>
          <input 
            required
            ref={password2Ref}
            type="password"
            name="password2"
            placeholder="비밀번호를 확인해주세요"
          />
        </fieldset>

        <button onClick={submitForm}>회원가입</button>
      </form>
    </div>
  );
}