import React from "react";
import { useState } from "react";
import DogPaw from '../.././assets/dog-paw.png'
import './LoginSignup.scss'




function LoginSignup(){
    

    const [Login,setLogin] = useState("Sign Up")
    return (
        <>
            <div className="loginDiv">
                <img  className = "logo "src={DogPaw} alt=" SignUp Logo" />
                <div className="input"> 
                    <input className="Username" type="text" />
                </div>
                <div className="input"> 
                    <input className ="Email" type="text" />
                </div>
                <div className="input">
                    <input className = "Password" type="text" />
                </div>
                <div className="input">
                    <input className = "reenter Password" type="text" />
                </div>
                
                



                
                


            
            </div>
        </>
    )
}

export default LoginSignup

