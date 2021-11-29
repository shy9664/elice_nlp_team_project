import React, { useRef, useState } from "react";
import './login.css'


export default function LoginForm({ onSubmit }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  /*
  const password2Ref = useRef();
 const nickmaneRef = useRef();
*/

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
        <fieldset className="box1">
          <label htmlFor="email">이메일</label>
          <input
            placeholder="메일을 입력해주세요."
            required
            ref={emailRef}
            id="email"
            type="email"
            name="email"
            autocomplete="off"
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
            placeholder="비밀번호를 입력해주세요."
          />
        </fieldset>
        <button type="submit" onClick={submitForm}>
          로그인
        </button>
      </form>
    </div>
  );
}
