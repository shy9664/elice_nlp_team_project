import React, { useState } from 'react'
import {useDispatch} from 'react-redux';
import { withRouter} from 'react-router-dom'

function iRegister(props) {


    const dispatch = useDispatch();

    const [Email, setEmail] = React.useState(" ")
    const [Password, setPassword] = React.useState(" ")
    const [Name, setName] = React.useState(" ")
    const [ConfirmPassword, setConfirmPassword] = React.useState(" ")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }


    const onSubmitHandler = (event) => {
        event.preventDefault();

       
        if(Password !== ConfirmPassword){
            return alert('비밀번호를 확인해주세요')
        } 



        let body={
            email: Email,
            password: Password,
            name: Name
        }

    dispatch(registerUser(body))
    .then (response => {
        if(response.payload.success) {
            props.history.push('/login')
        } else {
            alert('Failed to sign up')
        }
        
    })
}
export default withRouter(iRegister);