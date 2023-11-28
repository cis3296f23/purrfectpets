import React from "react";
import { useState, useEffect } from "react";
import DogPaw from '../.././assets/dog-paw.png'
import './LoginSignup.scss'
import ProfilePic from '../.././assets/ProfilePic.png'
import Email from '../.././assets/Email.png'
import Password from '../.././assets/Password.png'





function LoginSignup() {

    const [Login, setLogin] = useState("Create an Account")
    const [usernameInput, setUsernameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [passwordInput2, setPasswordInput2] = useState('')
    const [validPassword, setValidPassword] = useState('valid')

    const usernameValue = (event) => {
        setUsernameInput(event.target.value);
    }
    const emailValue = (event) => {
        setEmailInput(event.target.value);
    }

    const passwordValue = (event) => {
        setPasswordInput(event.target.value);
    }
    const passwordValue2 = (event) => {
        setPasswordInput2(event.target.value);
    }

    // checks if the passwords match before continuing
    const arePasswordsEqual = () => {
        return passwordInput === passwordInput2
    }


    return (
        <div className="login-container">
            <div className="loginDiv">
                <img className="account-logo " src={DogPaw} alt=" SignUp Logo" />
                <div className="header">
                    <h1>{Login}</h1>
                </div>

                <div className="inputs">
                    {Login === "Create an Account" ? <div className="input-div">
                        <img src={ProfilePic} alt="" />
                        <input
                            className="input"
                            type="text"
                            placeholder="Username"
                            value={usernameInput}
                            onChange={usernameValue} />
                    </div> : <div> </div>}

                    <div className="input-div">
                        <img src={Email} alt="" />
                        <input
                            className="input"
                            type="text"
                            placeholder="Email"
                            value={emailInput}
                            onChange={emailValue} />
                    </div>

                    <div className="input-div">
                        <img src={Password} alt="" />
                        <input
                            className="input"
                            type="text"
                            placeholder="Password"
                            value={passwordInput2}
                            onChange={passwordValue2} />
                    </div>

                    {Login === "Create an Account" ? <div className="input-div">
                        <img src={Password} alt="" />
                        <input
                            className="input"
                            type="text"
                            placeholder="Repeat Password"
                            value={passwordInput}
                            onChange={passwordValue} />
                    </div>
                        :
                        <div></div>}
                    {/* checks if the user is the sign up page and then checks if the user entered the same password twice */}
                    {Login === "Create an Account" ?
                        validPassword === 'valid' ?
                            <div></div>
                            :
                            <p className="invalidPassword">Passwords do not match</p>
                        :
                        <div></div>}

                </div>

                <div className="submit-div">
                    <button className="submit" onClick={() => {
                        if (Login === 'Login') {
                            alert("need to verify their account against the DB")
                            setValidPassword('valid')
                            // need to write code here to check against the DB
                            // check if email is in the DB
                            //if valid, save the username, so it can be fetched later on in account
                            //if it is not valid ..ie undefined.. display that the creds are incorrect

                            
                        }
                        else {
                            if (arePasswordsEqual()) {
                                setValidPassword("valid")
                                let options = {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json;charset=utf-8'
                                    },
                                    body: JSON.stringify({
                                        "username": usernameInput,
                                        "email": emailInput,
                                        "password": passwordInput,
                                        "preferences": "0"
                                    })
                                }
                                const response = fetch('/Users', options)

                                response.then(res =>
                                    res.json()).then(d => {
                                        console.log(d)
                                    })
                                

                            }
                            else {
                                setValidPassword("invalid")
                            }

                        }
                        //window.location.pathname = '/app'
                    }}>
                        Continue</button>


                    {/* Either display the sign up page or login page depending on what they click */}
                    <p>{Login === "Create an Account" ? "Have an Account?" : "Don't have an Account?"}</p>
                    <p className="btn" onClick={() => { Login === "Create an Account" ? setLogin("Login") : setLogin("Create an Account") }}>
                        {Login === "Create an Account" ? "Login" : "Create an Account"}</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup
