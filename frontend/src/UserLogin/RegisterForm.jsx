import React, { useRef } from "react";

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
            placeholder="Enter email."
            required
            ref={emailRef}
            id="email"
            type="email"
            name="email"
            autoComplete="off"
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
            placeholder="Enter password."
          />
        </fieldset>
        <button onClick={submitForm}>회원가입</button>
      </form>
    </div>
  );
}