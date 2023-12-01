import React from "react";
import { useState,useEffect } from "react";
import './Account.scss'
import SideBar from "./Sidebar";
import FaceIcon from '@mui/icons-material/Face';
import EditIcon from '@mui/icons-material/Edit';
import UserPreferences from "../UserPreferences";






function Account(){

    const [userName, getUsername] = useState('')
    const [email, getEmail] = useState('')
    const [petLiked, getPetLiked] = useState('100')
    const[currentLocation, getCurrentLocation] = useState('New Jersey')
    const sessionUser = sessionStorage.getItem("userinfo");
    

    const [newUsername, setNewUsername] = useState('')
    const [newEmail,setNewEmail] = useState('')
    const [newPassword,setNewPassword] = useState('')
    const [verifyNewPassword, checkVerifyNewPassword] = useState('')

    const usernameValue = (event) => {
        setNewUsername(event.target.value);
    }
    const emailValue = (event) => {
        setNewEmail(event.target.value);
    }
    const passwordValue = (event) => {
        setNewPassword(event.target.value);
    }
    const passwordValue2 = (event) => {
        checkVerifyNewPassword(event.target.value);
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
    
    let username =  sessionUser; //fetch by specific username
    
        useEffect(() => {
            const fetchUserData = async () => {
            try {
                const response = await fetch(`/users/username/${username}`,{method: 'GET'});
                const userData = await response.json();
                console.log('User Data:', userData);
                getUsername(userData.username);
                getEmail(userData.email)
            } catch (error) {
            console.error('Error fetching user data:', error);
            }
        };
        
        fetchUserData();
        }, []);


    return (
    <div className="account-container">
        <SideBar />
        <div className="account">

            <div className="user-pref">
                <UserPreferences/>
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
                        placeholder='username'/>

                        <input 
                        name="email-input"
                        className="update-input-box"
                        type="text" 
                        placeholder='email'/>

                        <input 
                        name="password-input"
                        className="update-input-box"
                        type="password"
                        placeholder="password" />

                        <input
                        name="password2-input"
                        className="update-input-box"
                        type="password"
                        placeholder="reenter password" />


                    </div>
                    <button className="save-modal" onClick={toggleModal}>
                        save</button>
                    <button className="close-modal" onClick={toggleModal}>
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

