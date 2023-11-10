import React from "react";
import { useState } from "react";
import DogPaw from '../.././assets/dog-paw.png'
import './LoginSignup.scss'
import ProfilePic from '../.././assets/ProfilePic.png'
import Email from '../.././assets/Email.png'
import Password from '../.././assets/Password.png'




function LoginSignup() {


    const [Login, setLogin] = useState("Create an Account")

    const[passwordInput,setPasswordInput] = useState('')
    const[passwordInput2,setPasswordInput2] = useState('')

    const passwordValue = (event) =>{
        setPasswordInput(event.target.value);
    }
    const passwordValue2 = (event) =>{
        setPasswordInput2(event.target.value);
    }

    // checks if the passwords match before continuing
    const arePasswordsEqual = () =>{
        return passwordInput === passwordInput2
    }
    




    return (
        <div className="container">
            <div className="loginDiv">
                <img className="logo " src={DogPaw} alt=" SignUp Logo" />
                <div className="header">
                    <h1>{Login}</h1>
                </div>

                <div className="inputs">
                    {Login === "Create an Account" ? <div className="input-div">
                        <img src= {ProfilePic} alt="" />
                        <input className="input" type="text" placeholder="Username" />
                    </div> : <div> </div>}


                    <div className="input-div">
                        <img src={Email} alt="" />
                        <input className="input" type="text" placeholder="Email" />
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
                            value = {passwordInput}
                            onChange={passwordValue}/>
                    </div>
                    :  
                    <div></div>}

                </div>

                <div className="submit-div">
                    <button className="submit" onClick={() => {
                        {Login==='Login'? alert("need to verify their account against the DB")
                        :
                        alert(` ${arePasswordsEqual()? 'passwords match \n add their creds into the DB and render the user preferences' : 'passwords dont match'}`)}
                    }}>
                        Continue</button>
                    {/* Either display the sign up page or login page depending on what they click */}
                    <p>{Login === "Create an Account"? "Have an Account?": "Don't have an Account?"}</p>
                    <p className="btn"onClick={() => {Login === "Create an Account"? setLogin("Login"):setLogin("Create an Account")}}>
                    {Login === "Create an Account"? "Login": "Create an Account"}</p>
                </div>





            </div>
        </div>
    )
}

export default LoginSignup

