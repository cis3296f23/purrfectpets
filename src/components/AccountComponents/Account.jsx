import React from "react";
import { useState,useEffect } from "react";
import './Account.scss'
import SideBar from "./Sidebar";
import FaceIcon from '@mui/icons-material/Face';
import UserPreferences from "../UserPreferences";




//TODO:
//1. fetch user data from database - done
//2. display user data - done
//3. open modal to update user info - done
//4. enter data into the input boxes
//5. if the input boxes are empty, then the data will remain unchanged
//6. if the input boxes are filled, then the data will be updated
    //check if the new email and new username are available
    //if the new email and new username are not available, display error message
    //check if password and verify password are the same
    //if password and verify password are not the same, display error message
    //hash the password and save it
//7. the save button will save the changes
//8. the cancel button will close the modal and not save the changes

function Account(){

    const [userName, getUsername] = useState('')
    const [email, getEmail] = useState('')
    const [userID, getUserID] = useState('')



    

    const [newUsername, setNewUsername] = useState('empty')
    const [newEmail,setNewEmail] = useState('empty')
    const [newPassword,setNewPassword] = useState('empty')

    const [verifyNewPassword, checkVerifyNewPassword] = useState('empty')

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
    
    let userEmail =  sessionStorage.getItem("userinfo");
    
    
        useEffect(() => {
            const fetchUserData = async () => {
            try {
                const response = await fetch(`/users/userInfo/${userEmail}`,{method: 'GET'});
                const userData = await response.json();
                console.log('User Data:', userData);
                getUsername(userData.username);
                getEmail(userData.email);
                getUserID(userData.id);
            } catch (error) {
            console.error('Error fetching user data:', error);
            }
        };

        

        
        fetchUserData();
        }, []);

    const updateInfo = async () => {
        try{
            const response = await fetch(`/id/${userID}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    'username': newUsername,
                    'email': newEmail,
                    'password': newPassword
                })
            });
            const data = await response.json();
            console.log(data);
        } 
        catch (error) {  
            console.error('Error updating user data:', error);
        }
    }
        
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
                    <button className="save-modal" onClick={updateInfo}>
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

