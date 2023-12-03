import React from "react";
import { useState,useEffect } from "react";
import './Account.scss'
import SideBar from "./Sidebar";
import FaceIcon from '@mui/icons-material/Face';
import UserPreferences from "../UserPreferences";
import bcrtpy from 'bcryptjs';
import e from "express";




//TODO:
//1. fetch user data from database - done
//2. display user data - done
//3. open modal to update user info - done
//4. enter data into the input boxes - done
//5. if the input boxes are empty, then the data will remain unchanged - done
//6. if the input boxes are filled, then the data will be updated - done
    //check if the new email and new username are available
    //if the new email and new username are not available, display error message
    //check if password and verify password are the same
    //if password and verify password are not the same, display error message
    //hash the password and save it
//7. the save button will save the changes
//8. the cancel button will close the modal and not save the changes

function Account(){

    //original user info
    const [userName, getUsername] = useState('')
    const [email, getEmail] = useState('')
    const [userID, getUserID] = useState('')
    const [password, getPassword] = useState('')




    
    //updated  user info
    const [newUsername, setNewUsername] = useState('')
    const [newEmail,setNewEmail] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [newSalt,setNewSalt] = useState('')
    const [verifyNewPassword, checkVerifyNewPassword] = useState('')

    //check if the new email and new username are available
    //checks if the two passwords are the same
    
    //displays a textbox accordingly
    const[validUsername, setValidUsername] = useState(true)
    const[validEmail, setValidEmail] = useState(true)
    const[validPassword, setValidPassword] = useState(true)


    //store the onChange values
    const usernameOnChange= (event) => {
        if(event.target.value === ''){
            setNewUsername(userName)
        }
        else{
        setNewUsername(event.target.value)
        }
    }
    const emailOnChange = (event) => {
        if(event.target.value === ''){
            setNewEmail(email)
        }
        else{
        setNewEmail(event.target.value)
        }
    }
    const passwordOnChange = (event) => {
        if(event.target.value === ''){
            setNewPassword(password)
        }
        else{
        setNewPassword(event.target.value)
        }
        console.log(newPassword)
    }
    const password2OnChange = (event) => {
        checkVerifyNewPassword(event.target.value)
        console.log(verifyNewPassword)
    }


    //if the input boxes are empty, then the data will remain unchanged
    //setting the 'new' variables to the original variables
    const handleCancel = () => {
        setNewUsername(userName)
        setNewEmail(email)
        setNewPassword(password)
        checkVerifyNewPassword('')
        setValidUsername(true)
        setValidEmail(true)
        setValidPassword(true)

    }


    const handleSave = () => {
        //check if the new email and new username are available
        //if the new email and new username are not available, display error message
        //check if password and verify password are the same
        //if password and verify password are not the same, display error message
        //hash the password and save it
        

        if(newUsername === userName){
            setValidUsername(false)
        }
        else{
            setValidUsername(true)
        }
        if(newEmail === email){
            setValidEmail(false);
        }
        else{
            setValidEmail(true);
        }


        if(newPassword !== verifyNewPassword){
            alert("passwords do not match")
            setValidPassword(false)
        }
        else{
            setValidPassword(true)
        }

        if(validUsername == true && validEmail == true && validPassword == true){
            //hash the password
            const salt = bcrtpy.genSaltSync(10)
            const hash = bcrtpy.hashSync(newPassword,salt)
            setNewPassword(hash)
            setNewSalt(salt)
            //update the user info
            //updateInfo();
            //close the modal
            toggleModal()
        }
    }






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
    //console.log(userEmail)
    
    
        useEffect(() => {
            const fetchUserData = async () => {
            try {
                const response = await fetch(`/users/userInfo/${userEmail}`,{method: 'GET'});
                const userData = await response.json()
                console.log('User Data:', userData)
                getUsername(userData.username)
                getEmail(userData.email)
                getUserID(userData.id)
                getPassword(userData.password)
            } catch (error) {
            console.error('Error fetching user data:', error)
            }
        }; 
        fetchUserData()
        }, [])

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
                    'username': newUsername,
                    'email': newEmail,
                    'password': newPassword,
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
                    {/* Not sure how to do profile picture, might assign the user a number
                    the number represents a preselected img */}
                    </div>

                </div>
                <div className="userName-container">
                    <div className="account-username"><h2>{userName}</h2></div>
                </div>


                <div className="userName-container">
                    <p>Email</p>
                    <div className="account-username"><h2>{email}</h2></div>
                </div>

                <button onClick={toggleModal} className="btn-modal">
                Edit Profile
                </button>

                {/* show and hide the update modal  */}
                {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                    <h2>Update Info</h2>
                    <p>Leave fields blank if want to remain unchanged</p>
                    <div className="update-info-div">

                        <input
                        name="username-input"
                        className="update-input-box"
                        type="text"
                        placeholder='username'
                        onChange={usernameOnChange}/>
                        
                        <input 
                        name="email-input"
                        className="update-input-box"
                        type="text" 
                        placeholder='email'
                        onChange={emailOnChange}/>

                        <input 
                        name="password-input"
                        className="update-input-box"
                        type="password"
                        placeholder="password" 
                        onChange={passwordOnChange}/>

                        <input
                        name="password2-input"
                        className="update-input-box"
                        type="password"
                        placeholder="reenter password"
                        onChange={password2OnChange} />


                    </div>
                    {/* <button className="save-modal" onClick={updateInfo}>
                        save</button> */}
                    <button className="save-modal" onClick={handleSave}>
                    save</button>
                    <button className="close-modal" onClick={()=>{
                        toggleModal();
                        handleCancel();
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

