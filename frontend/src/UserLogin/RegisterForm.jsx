import React, { useRef, useState } from "react";

/*
const Signup = () =>{
  const [id, setId] = useState('');
  const [nic, setNic] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordError, setPasswordError] = useState(false); 

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2){
        return setPasswordError(true);
    }

    console.log({
      id,
      nickname,
      password,
      password2
    });
  };
};
 */

export default function RegisterForm({ onSubmit }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  
  const password2Ref = useRef();

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
          />
        </fieldset>

        

        

        <button onClick={submitForm}>회원가입</button>
      </form>
    </div>
  );
}