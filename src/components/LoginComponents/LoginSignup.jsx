import React from "react";
import { useState, useEffect } from "react";
import DogPaw from '../.././assets/dog-paw.png'
import './LoginSignup.scss'
import ProfilePic from '../.././assets/ProfilePic.png'
import Email from '../.././assets/Email.png'
import Password from '../.././assets/Password.png'
import bcrypt from 'bcryptjs'

function LoginSignup() {
    //states
    const [Login, setLogin] = useState("Create an Account")
    const [usernameInput, setUsernameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [passwordInput2, setPasswordInput2] = useState('')
    const [validPassword, setValidPassword] = useState('valid')

    //check if the entered email/password when logging in is correct
    const [verifyEmail, setVerifyEmail] = useState(false)
    const [verifyPassword, setVerifyPassword] = useState('')
    const [accountUsername, setAccountUsername] = useState('')

    //two boolean to check if they click 'continue'
    const [isTryingToLogin, setIsTryingToLogin] = useState(false)
    const [isTryingToSignUp, setIsTryingToSignUp] = useState(false)

    //checks if the enter username/email is already in the DB
    const [checkUsernameAvailability, setUsernameAvailability] = useState('')
    const [checkEmailAvailability, setEmailAvailability] = useState('')

    //this display if the username/email was taken or not
    const [checkUsernameAvailabilityText, setUsernameAvailabilityText] = useState(true)
    const [checkEmailAvailabilityText, setEmailAvailabilityText] = useState(true)

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

    //when registering, check if the passwords are the same
    const arePasswordsEqual = () => {
        return passwordInput === passwordInput2
    }

    // when logging in,checks if the password input matches the the password in the DB
    const passwordDatabaseCheck = async (hashedPass) => {
        const response = await fetch(`/users/login/${hashedPass}/${emailInput}`, { method: 'GET' });
        const pwCheck = await response.json();
        
        return pwCheck;
    }

    //fetches the user info from the DB
    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                if (isTryingToLogin) {
                    let response = fetch(`/users/checkemail/${emailInput}`, { method: 'GET' });
                    let userData = await response.json();
                    setVerifyEmail(!userData);
                    if (!userData) {
                        response = fetch(`/users/salt/${emailInput}`, { method: 'GET' });
                        userData = await response.json();
                        const hashedPass = bcrypt.hashSync(passwordInput, userData.salt);
                        const checkedPw = await passwordDatabaseCheck(hashedPass);
                        if (checkedPw) {
                            console.log("LOGGING IN")
                            response = fetch(`/users/username/${emailInput}`, { method: 'GET' });
                            userData = await response.json();
                            setAccountUsername(userData.username);
                        }
                        setVerifyPassword(checkedPw);
                    }
                }
                if (isTryingToSignUp) {
                    const response = fetch(`/users/checkemail/${emailInput}`, { method: 'GET' });
                    const userData = await response.json();
                    console.log('EmailAvailable:', userData);
                    setEmailAvailability(userData)
                    setUsernameAvailability(userData)
                }
            } catch (error) {
                //console.error('Error fetching user data:', error);
                setVerifyEmail(false)
                setVerifyPassword('')
            }
        };

        const fetchUserUsername = async () => {
            try {
                const response = await fetch(`/users/checkusername/${usernameInput}`, { method: 'GET' });
                const userData = await response.json();
                console.log('UsernameAvailable:', userData);
                setUsernameAvailability(userData)
            } catch (error) {
                //console.error('Error fetching user data:', error);
                setVerifyEmail(false)
                setVerifyPassword('')
            }
        };
        if (isTryingToLogin) {
            fetchUserEmail();
            setIsTryingToLogin(false)
        }
        if (isTryingToSignUp) {
            fetchUserEmail()
            fetchUserUsername()
            setIsTryingToSignUp(false)
        }
    });

    return (
        <div className="login-container"
            onClick={() => {
                if (Login === 'Login') {
                    setIsTryingToLogin(true)
                } else {
                    setIsTryingToSignUp(true)
                }
            }}>
            <div className="loginDiv">
                <img className="account-logo " src={DogPaw} alt=" SignUp Logo" />
                <div className="header">
                    <h1>{Login}</h1>
                </div>
                <div className="inputs">
                    {Login === "Create an Account" ?
                        <div className="input-div">
                            <div className="input-textbox">
                                <img src={ProfilePic} alt="" />
                                <input
                                    name="input"
                                    className="input"
                                    type="text"
                                    placeholder="Username"
                                    value={usernameInput}
                                    onChange={usernameValue}
                                    />
                            </div>
                            {Login === "Create an Account" ?
                                checkUsernameAvailabilityText === true ?
                                    <div className="spaceHolder"></div>
                                    :
                                    <p className="invalidPassword">Username taken</p>
                                :
                                <div></div>}
                        </div> :
                        <div> </div>}

                    <div className="input-div">
                        <div className="input-textbox">
                            <img src={Email} alt="" />
                            <input
                                name="input"
                                className="input"
                                type="text"
                                placeholder="Email"
                                value={emailInput}
                                onChange={emailValue}
                            />
                        </div>
                        {Login === "Create an Account" ?
                            checkEmailAvailabilityText === true ?
                                <div className="spaceHolder"></div>
                                :
                                <p className="invalidPassword">Email taken</p>
                            :
                            <div> </div>}
                    </div>

                    <div className="input-div">
                        <div className="input-textbox">
                            <img src={Password} alt="" />
                            <input
                                name="input"
                                className="input"
                                type="password"
                                placeholder="Password"
                                value={passwordInput}
                                onChange={passwordValue}
                                />
                        </div>
                    </div>

                    {Login === "Create an Account" ? <div className="input-div">
                        <div className="input-textbox">
                            <img src={Password} alt="" />
                            <input
                                name="input"
                                className="input"
                                type="password"
                                placeholder="Repeat Password"
                                value={passwordInput2}
                                onChange={passwordValue2} />
                        </div>
                        {Login === "Create an Account" ?
                            validPassword === 'valid' ?
                                <div className="spaceHolder"></div>
                                :
                                <p className="invalidPassword">Passwords do not match</p>
                            :
                            <div> </div>}
                    </div>
                        :
                        <div></div>}
                    {/* checks if the user is the sign up page and then checks if the user entered the same password twice */}
                </div>

                <div className="submit-div">
                    <button className="submit" onClick={() => {
                        //on the login page
                        if (Login === 'Login') {
                            //stops display "passwords do not match"
                            setValidPassword('valid')
                            //fetches the user from the DB
                            setIsTryingToLogin(true)
                            //if the password entered is correct, process to the the next page
                            if (passwordDatabaseCheck()) {
                                console.log('passwords are a match')
                                sessionStorage.setItem("userinfo", accountUsername);
                                console.log(`this is the session user ${sessionStorage.getItem("userinfo")}`)
                                window.location.pathname = '/app'
                            }
                            else {
                                alert("incorrect information")
                                //add a useState to display incorrect info
                            }
                        }
                        //on the registration page 
                        else {
                            setIsTryingToSignUp(true)
                            //if the passwords match, add to DB
                            //need to check if username and email already exists in the DB
                            //need to check username, email, passwords are empty
                            if (emailInput == '' || usernameInput == '' || passwordInput == '' || passwordInput2 == '') {
                                alert('fill all boxes please')
                            }
                            else {
                                console.log(checkEmailAvailability)
                                setEmailAvailabilityText(checkEmailAvailability)
                                console.log(checkUsernameAvailability)
                                setUsernameAvailabilityText(checkUsernameAvailability)
                                if (!checkEmailAvailability && !checkUsernameAvailability) {
                                    setEmailAvailabilityText(true)
                                    setUsernameAvailabilityText(true)
                                    if (arePasswordsEqual()) {
                                        setValidPassword("valid")
                                        const salt = bcrypt.genSaltSync(10);
                                        const hashedPass = bcrypt.hashSync(passwordInput, salt);
                                        let options = {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json;charset=utf-8'
                                            },
                                            body: JSON.stringify({
                                                "username": usernameInput,
                                                "email": emailInput,
                                                "password": hashedPass,
                                                "salt": salt,
                                                "preferences": "0"
                                            })
                                        }

                                        const response = fetch('/Users', options)
                                        response.then(res =>
                                            res.json()).then(d => {
                                                console.log(d)
                                            })
                                        sessionStorage.setItem("userinfo", { usernameInput });
                                        window.location.pathname = '/app'
                                    }
                                    else {
                                        setValidPassword("invalid")
                                    }
                                }
                            }
                        }
                    }}>
                        Continue</button>

                    {/* Either display the sign up page or login page depending on what they click */}
                    <p>{Login === "Create an Account" ? "Have an Account?" : "Don't have an Account?"}</p>
                    <p className="btn" onClick={() => { Login === "Create an Account" ? (setLogin("Login"), setValidPassword('valid')) : setLogin("Create an Account") }}>
                        {Login === "Create an Account" ? "Login" : "Create an Account"}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup