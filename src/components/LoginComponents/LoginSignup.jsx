import React from "react";
import { useState, useEffect } from "react";
import DogPaw from '../.././assets/dog-paw.png'
import './LoginSignup.scss'
import ProfilePic from '../.././assets/ProfilePic.png'
import Email from '../.././assets/Email.png'
import Password from '../.././assets/Password.png'




function LoginSignup() {


    //states
    const [Login, setLogin] = useState("Create an Account")
    const [usernameInput, setUsernameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [passwordInput2, setPasswordInput2] = useState('')
    const [validPassword, setValidPassword] = useState('valid')
    

    const [verifyEmail, setVerifyEmail] = useState(false)
    const [verifyPassword, setVerifyPassword] = useState('')
    const [accountUsername, setAccountUsername] = useState('')
    
    const [isTryingToLogin, setIsTryingToLogin] = useState(false)

    const [isTryingToSignUp, setIsTryingToSignUp] = useState(false)
    const [checkUsernameAvailability, setUsernameAvailability] = useState('')
    const [checkEmailAvailability, setEmailAvailability] = useState('')

    
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
    const passwordDatabaseCheck = () =>{

        return ((passwordInput === verifyPassword) && verifyEmail)
    }

    //fetches the user from the DB
    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const response = await fetch(`/users/email/${emailInput}`,{method: 'GET'});
                const userData = await response.json();
                console.log('User Data:', userData);
                if(isTryingToLogin){
                    setVerifyEmail(true)
                    setVerifyPassword(userData.password)
                    setAccountUsername(userData.username)
                }
                if(isTryingToSignUp){
                    setEmailAvailability(userData.email)
                    setUsernameAvailability(userData.username)

                }

            } catch (error) {
                //console.error('Error fetching user data:', error);
                setVerifyEmail(false)
                setVerifyPassword('')
            }
        };

        const fetchUserUsername = async () => {
            try {
                const response = await fetch(`/users/username/${usernameInput}`,{method: 'GET'});
                const userData = await response.json();
                console.log('User Data:', userData);
            
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
        if(isTryingToSignUp){
            fetchUserEmail()
            fetchUserUsername()
            console.log("AHHHHHHHHHH")
            setIsTryingToSignUp(false)
        
            
        }

        
    });


    

    return (
        <div className="login-container" 
        onClick={() =>{
            if (Login === 'Login'){
                    setIsTryingToLogin(true)
            }
        }}>
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
                            onChange={emailValue}
                            />
                    </div>

                    <div className="input-div">
                        <img src={Password} alt="" />
                        <input
                            className="input"
                            type="password"
                            placeholder="Password"
                            value={passwordInput}
                            onChange={passwordValue} />
                    </div>

                    {Login === "Create an Account" ? <div className="input-div">
                        <img src={Password} alt="" />
                        <input
                            className="input"
                            type="password"
                            placeholder="Repeat Password"
                            value={passwordInput2}
                            onChange={passwordValue2} />
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
                        //on the login page
                        if (Login === 'Login') {
                            //stops display "passwords do not match"
                            setValidPassword('valid')

        
                            //fetches the user from the DB
                            setIsTryingToLogin(true)

                            //if the password entered is correct, process to the the next page
                            if(passwordDatabaseCheck()){
                                console.log('passwords are a match')
                                sessionStorage.setItem("userinfo", accountUsername);
                                window.location.pathname = '/app'
                            }
                            else{
                                alert("incorrect information")
                                //add a useState to display incorrect info
                            }
                        }
                        //on the registration page 
                        else {
                        
                            setIsTryingToSignUp(true)
                            //console.log(isTryingToSignUp)
                            //if the passwords match, add to DB
                            //need to check if username and email already exists in the DB
                            //need to check username, email, passwords are empty
                            if(emailInput == '' || usernameInput == '' || passwordInput == '' || passwordInput2 == ''){

                            }
                            else{
                                console.log(checkEmailAvailability)
                                if(checkEmailAvailability === emailInput){
                                    alert('email already taken')
                                }

                                if (checkUsernameAvailability === usernameInput){
                                    alert("username already taken")
                                }
                                if (checkEmailAvailability != emailInput && checkUsernameAvailability != usernameInput){
                                    if (arePasswordsEqual()) {
                                        setValidPassword("valid")
                                        console.log("werafsdfasfsfdsf")
                                        // let options = {
                                        //     method: 'POST',
                                        //     headers: {
                                        //         'Content-Type': 'application/json;charset=utf-8'
                                        //     },
                                        //     body: JSON.stringify({
                                        //         "username": usernameInput,
                                        //         "email": emailInput,
                                        //         "password": passwordInput,
                                        //         "preferences": "0"
                                        //     })
                                        // }
                                        
                                        // const response = fetch('/Users', options)
                                        // response.then(res =>
                                        //     res.json()).then(d => {
                                        //         console.log(d)
                                        //     })
                                        // sessionStorage.setItem("userinfo", {usernameInput});
                                        // window.location.pathname = '/app'
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
                    <p className="btn" onClick={() => { Login === "Create an Account" ? setLogin("Login") : setLogin("Create an Account") }}>
                        {Login === "Create an Account" ? "Login" : "Create an Account"}</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup
