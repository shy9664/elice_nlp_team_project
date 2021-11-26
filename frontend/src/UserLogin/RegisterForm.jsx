import React, { useRef, useState } from "react";



export default function RegisterForm({ onSubmit }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  /* 주석처리해둔 부분은 register 등록은 되는데 login이 제대로 작동하지 않아서 임시로 막아뒀습니다 ㅠ
  const password2Ref = useRef();
  const nicknameRef = useRef();
  */
  

  const submitForm = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    /*
    const password2 = password2Ref.current.value;
    const nickname = nicknameRef.current.value;
    */
   
    

    const formData = {
      email,
      password,
      /*
      password2,
      nickname
      */
    };

    onSubmit(formData);
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
            placeholder="아니면 밑에 작게 글씨 뜨는게 나을까요??"
          />
        </fieldset>
    {/*
        <fieldset>
          <label htmlFor="password2">비밀번호 확인</label>
          <input 
            required
            ref={password2Ref}
            type="password"
            name="password2"
            placeholder="비밀번호를 확인해주세요"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="nickname">닉네임</label>
          <input 
            required
            ref={nicknameRef}
            
            name="nickname"
            placeholder="닉네임을 입력해주세요"
          />
        </fieldset>
        */}

        <button onClick={submitForm}>회원가입</button>
      </form>
    </div>
  );
}