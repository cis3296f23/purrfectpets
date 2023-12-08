import React from "react";
import { useState, useEffect } from "react";
import DogPaw from '../.././assets/dog-paw.png'
import './LoginSignup.scss'
import ProfilePic from '../.././assets/ProfilePic.png'
import Email from '../.././assets/Email.png'
import Password from '../.././assets/Password.png'
import bcrypt from 'bcryptjs'




/**
 * LoginSingup component for the login and signup page.
 * Allows the user to login or create an account.
 * 
 * @component
 * @returns {JSX.Element} The rendered LoginSignup component.
 */

function LoginSignup() {
    //states
    const [Login, setLogin] = useState("Create an Account")
    const [usernameInput, setUsernameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [passwordInput2, setPasswordInput2] = useState('')
    const [validPassword, setValidPassword] = useState('valid')

    //check if the entered email/password when logging in is correct
    const [verifyEmail, setVerifyEmail] = useState(true)
    const [verifyPassword, setVerifyPassword] = useState(true)
    const [sessionEmail, setSessionEmail] = useState('')
    const [correctInfo, setCorrectInfo] = useState(true)

    //two boolean to check if they click 'continue'
    const [isTryingToLogin, setIsTryingToLogin] = useState(false)
    const [isTryingToSignUp, setIsTryingToSignUp] = useState(false)

    //checks if the enter username/email is already in the DB
    const [checkUsernameAvailability, setUsernameAvailability] = useState('')
    const [checkEmailAvailability, setEmailAvailability] = useState('')

    //this display if the username/email was taken or not
    const [checkUsernameAvailabilityText, setUsernameAvailabilityText] = useState(true)
    const [checkEmailAvailabilityText, setEmailAvailabilityText] = useState(true)


    /**
     * Function to handle when the username input box is changed.
     * @function usernameValue
     * @param {Event} event - The onChange event.
     */
    const usernameValue = (event) => {
        setUsernameInput(event.target.value);
    }

    /**
     * Function to handle when the email input box is changed.
     * @function emailValue
     * @param {Event} event - The onChange event.
     */
    const emailValue = (event) => {
        setEmailInput(event.target.value);
    }
    /**
     * Function to handle when the password input box is changed.
     * @function passwordValue
     * @param {Event} event - The onChange event.
     */

    const passwordValue = (event) => {
        setPasswordInput(event.target.value);
    }
    /**
     * Function to handle when the reenter password input box is changed.
     * @function passwordValue2
     * @param {Event} event - The onChange event.
     */

    const passwordValue2 = (event) => {
        setPasswordInput2(event.target.value);
    }

    /**
     * Function to handle when the tab key is pressed.
     * @function detectTabKeyDown
     * @param {Event} event - The onKeyDown event.
     */
    const detectTabKeyDown = (e) => {
        if (e.key === "Tab"){
            setIsTryingToLogin(true)
            
        }
    }

    /**
     * Checks if two passwords are equal.
     *
     * @function arePasswordsEqual
     * @returns {boolean} Returns `true` if the passwords are equal, and `false` otherwise.
     */

    //when registering, check if the passwords are the same
    const arePasswordsEqual = () => {
        return passwordInput === passwordInput2
    }

    /**
     * Checks if the password and email are a valid combination in the database
     *
     * @function passwordDatabaseCheck
     * @async
     * @param {string} hashedPass - The hashed password.
     * @returns {boolean} Returns `true` if the combination is valid, and `false` otherwise.
     */

    // when logging in,checks if the password input matches the the password in the DB
    const passwordDatabaseCheck = async (hashedPass) => {
        const response = await fetch(`/users/login/${hashedPass}/${emailInput}`, { method: 'GET' });
        const pwCheck = await response.json();
        
        return pwCheck;
    }




    /**
     * A React hook that tracks when the user updates a input box.
     * 
     *
     * @memberof module:React
     */
    //fetches the user info from the DB
    useEffect(() => {



        /**
         * depending whether the user is logging in or signing up, will check if the email is available to sign up with,
         * or if the email/password is a valid combination to log in with
         *
         * @function fetchUserEmail
         * @async
         */
        const fetchUserEmail = async () => {
            try {
                if (isTryingToLogin) {
                    let response = await fetch(`/users/checkemail/${emailInput}`, { method: 'GET' });
                    let userData = await response.json();
                    console.log('EmailValid:', !userData);
                    setVerifyEmail(!userData)

                    if (!userData) {
                        response = await fetch(`/users/salt/${emailInput}`, { method: 'GET' });
                        userData = await response.json();
                        console.log('salt:', userData.salt);
                        const hashedPass = bcrypt.hashSync(passwordInput, userData.salt);
                        console.log('hash:', hashedPass);
                        const checkedPw = await passwordDatabaseCheck(hashedPass);
                        if (checkedPw) {
                            console.log("LOGGING IN")
                            response = await fetch(`/users/userInfo/${emailInput}`, { method: 'GET' });
                            userData = await response.json();
                            setSessionEmail(userData.email);
                        }
                        console.log(`LOGIN SUCCESS? ${checkedPw}`)
                        setVerifyPassword(checkedPw);
                        }
                    
                    let res = await fetch(`/users/userInfo/${emailInput}`, { method: 'GET' });
                    let user = await res.json();
                    console.log('Username:', user);
                    setSessionEmail(user.email);
                }
                if (isTryingToSignUp) {
                    const response = await fetch(`/users/checkemail/${emailInput}`, { method: 'GET' });
                    const userData = await response.json();
                    console.log('EmailAvailable:', userData);
                    setEmailAvailability(userData)

                    let res = await fetch(`/users/userInfo/${emailInput}`, { method: 'GET' });
                    let user = await res.json();
                    console.log('Username:', user);
                    setSessionEmail(user.email);
                }   
            } catch (error) {
                //console.error('Error fetching user data:', error);
                setVerifyEmail(false)
                setVerifyPassword(false)
            }
        };


        /**
         * Checks if the username is available to sign up with
         *
         * @function fetchUserUsername
         * @async
         */

        const fetchUserUsername = async () => {
            try {
                const response = await fetch(`/users/checkusername/${usernameInput}`, { method: 'GET' });
                const userData = await response.json();
                console.log('UsernameAvailable:', userData);
                setUsernameAvailability(userData)
            } catch (error) {
                //console.error('Error fetching user data:', error);
                setVerifyEmail(false)
                setVerifyPassword(false)
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
                                onKeyDown={detectTabKeyDown}
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
                        {Login === "Login" ?
                            (correctInfo ?
                                <div className="spaceHolder"></div>
                                :
                                <p className="invalidPassword">Incorrect information</p>
                            )
                            :
                            <div> </div>}
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
                            //if the password and email are correct, log them in
                            if (passwordDatabaseCheck()) {
                                console.log(verifyPassword)
                                console.log('passwords are a match')
                                sessionStorage.setItem("userinfo", sessionEmail);
                                console.log(`this is the session user ${sessionStorage.getItem("userinfo")}`)
                                window.location.pathname = '/app'
                            }
                            else{
                                setCorrectInfo(false)
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
                                //check if username and email are available
                                if (checkEmailAvailability && !checkUsernameAvailability) {
                                    setEmailAvailabilityText(true)
                                    setUsernameAvailabilityText(false)
                                }
                                if (!checkEmailAvailability && checkUsernameAvailability) {
                                    setEmailAvailabilityText(false)
                                    setUsernameAvailabilityText(true)
                                }

                                if (checkEmailAvailability && checkUsernameAvailability) {
                                    setEmailAvailabilityText(true)
                                    setUsernameAvailabilityText(true)
                                    //check if the two passwords are the same
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
                                        sessionStorage.setItem("userinfo", emailInput);
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