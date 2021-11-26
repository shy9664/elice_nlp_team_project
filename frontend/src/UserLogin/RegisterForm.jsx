import React, { useRef, useState } from "react";



export default function RegisterForm({ onSubmit }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  

  const submitForm = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
   
    

    const formData = {
      email,
      password,
     
    };

    onSubmit(formData);
  };

  return (
    <div>
      <form>
        <fieldset>
          <label htmlFor="email">이메일</label>
          <input
            
            required
            ref={emailRef}
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
            required
            ref={passwordRef}
            id="password"
            type="password"
            name="password"
            placeholder="아니면 밑에 작게 글씨 뜨는게 나을까요??"
          />
        </fieldset>

      

        

        

        <button onClick={submitForm}>회원가입</button>
      </form>
    </div>
  );
}