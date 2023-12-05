import React from "react";
import { useState,useEffect, useRef } from "react";
import './Account.scss'
import SideBar from "./Sidebar";
import FaceIcon from '@mui/icons-material/Face';
import UserPreferences from "../UserPreferences";
import bcrtpy from 'bcryptjs';
import {render} from 'react-dom';

//TODO:
//1. fetch user data from database - done
//2. display user data - done
//3. open modal to update user info - done
//4. enter data into the input boxes
//5. if the input boxes are empty, then the data will remain unchanged - done
//6. if the input boxes are filled, then the data will be updated - done
    //check if the new email and new username are available - done
    //if the new email and new username are not available, display error message -done
    //check if password and verify password are the same -done
    //if password and verify password are not the same, display error message -done
    //hash the password and save it - done 
//7. the save button will save the changes
//8. the cancel button will close the modal and not save the changes

function Account(){

    const hasRender = useRef(false);
    

    //original user info on the page
    const [userName, getUsername] = useState('')
    const [email, getEmail] = useState('')
    const [userID, getUserID] = useState('')
    const [password, getPassword] = useState('')
    const [salt, getSalt] = useState('')

    
    //user info added to the input boxes

    const [newUsername, setNewUsername] = useState('')
    const [newEmail,setNewEmail] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [verifyNewPassword, checkVerifyNewPassword] = useState('')

    //send these to the DB
    const[updateUsername, setUpdateUsername] = useState('')
    const[updateEmail, setUpdateEmail] = useState('')
    const [newHash, setNewHash] = useState('')

    //salt for the new password
    const [newSalt,setNewSalt] = useState('')

    
    
    //displays a textbox accordingly
    const[validUsername, setValidUsername] = useState(true)
    const[validEmail, setValidEmail] = useState(true)
    const[validPassword, setValidPassword] = useState(true)
    



    const[inModal, setInModal] = useState(false)

    //store the onChange values
    const usernameOnChange= (event) => {
        setNewUsername(event.target.value)
    }
    const emailOnChange = (event) => {
        setNewEmail(event.target.value)
    }

    const passwordOnChange = (event) => {
        setNewPassword(event.target.value)
    }
    const password2OnChange = (event) => {
        checkVerifyNewPassword(event.target.value)
    }


    //if the input boxes are empty, then the data will remain unchanged
    //setting the 'new' variables to the original variables
    const handleCancel = () => {
        setNewUsername('')
        setNewEmail('')
        setNewPassword('')
        checkVerifyNewPassword('')

        setValidUsername(true)
        setValidEmail(true)
        setValidPassword(true)
        toggleModal()

    }


    const handleSave =  () => {

        console.log('handleSaved Called')
        

        //return a boolean if the email or username is available
        if (newUsername === ''){
            setValidUsername(true)
        }
        if (newEmail === ''){
            setValidEmail(true)
        }

        if(newPassword !== verifyNewPassword){
            setValidPassword(false)
        }
        else if (newPassword === verifyNewPassword){
            setValidPassword(true)
            
        } 


    }


    const validInfo =  () => {

        console.log("validInfo called")
        console.log(validUsername,validEmail,validPassword)
        if (validUsername && validEmail&& validPassword){
            console.log('everything is valid')
            // if(newPassword === ''){
            //     setNewPassword(password)
            //     setNewSalt(salt)
            //     setNewHash(password)
            //     console.log(newHash,'new Hash')
            //     console.log(newPassword,'new password')
            //     console.log(password, 'old password')
            //     console.log(newSalt, 'new salt')
            //     console.log(salt, 'old salt')

            // }

            // else if (newPassword !== ''){
            //      //hash the password
            //     const salt = bcrtpy.genSaltSync(10)
            //     const hash = bcrtpy.hashSync(newPassword,salt)
            //     setNewPassword(hash)
            //     setNewHash(hash)
            //     setNewSalt(salt)
            //     console.log(newPassword,'new password')
            //     console.log(password, 'old password')
            //     console.log(newSalt, 'new salt')
            //     console.log(salt, 'old salt')

                
            // }  



            // console.log(newHash,'new Hash')
            // console.log(newPassword,'new password')
            // console.log(password, 'old password')
            // console.log(newSalt, 'new salt')
            // console.log(salt, 'old salt')
        
            
            sessionStorage.setItem("userinfo", updateEmail);
            console.log(newEmail,'new email')
            updateInfo();
            toggleModal()
            setNewUsername('')
            setNewEmail('')
            setNewPassword('')
            checkVerifyNewPassword('')
            window.location.reload(false);
            
        }
    }
    useEffect(() => {

        if (!render.current) {

        if (newUsername === ''){
            setValidUsername(true)
            setUpdateUsername(userName)

        }

        if (newEmail === ''){
            setValidEmail(true)
            setUpdateEmail(email)
        }

        if(newPassword === ''){
            setNewSalt(salt)
            setNewHash(password)
            console.log(newHash,'new Hash')
            console.log(newPassword,'new password')
            console.log(password, 'old password')
            console.log(newSalt, 'new salt')
            console.log(salt, 'old salt')

        }

        else if (newPassword !== ''){
             //hash the password
            const salt = bcrtpy.genSaltSync(10)
            const hash = bcrtpy.hashSync(newPassword,salt)
            setNewHash(hash)
            setNewSalt(salt)
            console.log(newHash,'new Hash')
            console.log(password, 'old password')
            console.log(newSalt, 'new salt')
            console.log(salt, 'old salt')
            

        }  
    }
        console.log(updateUsername,'update username')
        console.log(updateEmail,'update email')


    }, [validPassword,newPassword,updateUsername,updateEmail,handleSave]);






    //display the update modal
    const [modal,setModal] = useState(false)
    const toggleModal = () =>{
        setModal(!modal)
    }
    //stops the page from scrolling when the modal is displayed
    if(modal) {
        document.body.classList.add('active-modal')
        } else {
        document.body.classList.remove('active-modal')
        }
    

    //fetch user data from database
    let userEmail =  sessionStorage.getItem("userinfo");

    useEffect(() => {
        if (!hasRender.current) {
            const fetchUserData = async () => {
            try {
                const response = await fetch(`/users/userInfo/${userEmail}`,{method: 'GET'});
                const userData = await response.json()
                console.log('User Data:', userData)
                getUsername(userData.username)
                getEmail(userData.email)
                getUserID(userData.id)
                getPassword(userData.password)
                getSalt(userData.salt)
                setUpdateEmail(userData.email)
                setUpdateUsername(userData.username)
            } catch (error) {
            console.error('Error fetching user data:', error)
            }
            }
            fetchUserData()
            hasRender.current = true;

        }
    
        try{
            //check if username is available

            if(inModal){
                if(newUsername !== ''){
                    const checkUsernameAvailability = async () => {
                        try {
                            const response = await fetch (`/users/checkusername/${newUsername}`,{method: 'GET'})
                            const data  = await response.json()
                            setValidUsername(data)
                            if(data){
                                setUpdateUsername(newUsername)
                            }

                        }
                        catch (error) {
                            console.error('Error checking username availability:', error)
                            }
                        }
                        checkUsernameAvailability()
                    }
                    
            if(newEmail !== ''){
                //check if email is available
                const checkEmailAvailability = async () => {
                    try{
                        const response = await fetch (`/users/checkemail/${newEmail}`,{method: 'GET'})
                        const data = await response.json()
                        setValidEmail(data)
                        if(data){
                            setUpdateEmail(newEmail)
                        }
                    }
                    catch (error) {
                        console.error('Error checking email availability:', error)
                    }
                }
                checkEmailAvailability()

            }
            if(newPassword !== verifyNewPassword){
                setValidPassword(false)
            }
            else if (newPassword === verifyNewPassword){
                setValidPassword(true)
                
            }
            
            }
        }
        
        catch (error){
            console.error('Error fetching user data:', error)
        }

        })



    // //check if username is available
    // const checkUsernameAvailability = async () => {
    //     try {
    //         const response = await fetch (`/users/checkusername/${newUsername}`,{method: 'GET'})
    //         const data  = await response.json()
    //         setValidUsername(data)

    //     }
    //     catch (error) {
    //         console.error('Error checking username availability:', error)
    //     }
    // }

    // //check if email is available
    // const checkEmailAvailability = async () => {
    //     try{
    //         const response = await fetch (`/users/checkemail/${newEmail}`,{method: 'GET'})


    //         const data = await response.json()
    //         setValidEmail(data)
    //     }
    //     catch (error) {
    //         console.error('Error checking email availability:', error)
    //     }
    // }



    //update user data
    const updateInfo = async () => {
        try{

            let option = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },

                body: JSON.stringify({
                    'id': userID,
                    'username': updateUsername,
                    'email': updateEmail,
                    'password': newHash,
                    'salt': newSalt,
                })
            }
        
            const response = await fetch(`/users/id/${userID}`,option)
            const data = await response.json()
            console.log('User Data:', data)
        } 
        catch (error) {  
            console.error('Error updating user data:', error)
        }
    }
        
    return (
    <div className="account-container">
        <SideBar />
        <div className="account">

            <div className="user-pref">
                {/* <UserPreferences/> */}
            </div>

            <div className="account-user">
                <div className="account-pic-container">
                    <div className="account-pic">
                    <FaceIcon sx={{ fontSize: 150 }}/> 
                    </div>

                </div>
                <div className="userName-container">
                    <div className="account-username"><h2>{userName}</h2></div>
                </div>


                <div className="userName-container">
                    <p>Email</p>
                    <div className="account-username"><h2>{email}</h2></div>
                </div>

                <button onClick={()=>{
                    toggleModal();
                    setInModal(true);
                }} className="btn-modal">
                Edit Profile
                </button>

                {/* show and hide the update modal  */}
                {modal && (
                <div className="modal">
                    <div onClick={handleCancel} className="overlay"></div>
                    <div className="modal-content">
                    <h2>Update Info</h2>
                    <p>Leave fields blank if want to remain unchanged</p>
                    <div className="update-info-div">

                        <input
                        name="username-input"
                        className="update-input-box"
                        type="text"
                        placeholder='username'
                        value={newUsername}
                        onChange={usernameOnChange}/>
                        {validUsername ? null : <p className="error-message">username is not available</p>}
                        
                        <input 
                        name="email-input"
                        className="update-input-box"
                        type="text" 
                        placeholder='email'
                        value={newEmail}
                        onChange={emailOnChange}/>
                        {validEmail ? null : <p className="error-message">email is not available</p>}

                        <input 
                        name="password-input"
                        className="update-input-box"
                        type="password"
                        placeholder="password" 
                        value={newPassword}
                        onChange={passwordOnChange}/>

                        <input
                        name="password2-input"
                        className="update-input-box"
                        type="password"
                        placeholder="reenter password"
                        onChange={password2OnChange} />
                        {validPassword ? null : <p className="error-message">passwords do not match</p>}


                    </div>

                    <button className="save-modal" onClick={()=>{
                        handleSave();
                        validInfo()

                    

                        
                    }}>
                    save</button>
                    <button className="close-modal" onClick={()=>{
                        handleCancel();
                        setInModal(false);
                    }}>
                        cancel
                    </button>

                    </div>
                </div>
                )}

            </div>

        </div>

    </div>
    )

    }




export default Account;

