import React from "react";
import { useState,useEffect } from "react";
import './Account.scss'
import SideBar from "./Sidebar";
import FaceIcon from '@mui/icons-material/Face';
import EditIcon from '@mui/icons-material/Edit';


function Account(){

    const [userName, getUsername] = useState('')
    const [email, getEmail] = useState('')
    const [petLiked, getPetLiked] = useState('100')
    const[currentLocation, getCurrentLocation] = useState('New Jersey')
    const sessionUser = sessionStorage.getItem("userinfo");

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

                <div className="pet-liked-container">
                    <div className="account-pets"><h3>total pets liked {petLiked}</h3></div>
                    {/* can pull from the DB */}
                </div>

                <div className="userName-container">
                    <div className="account-username"><h2>{email}</h2></div>
                </div>
            
            </div>

        </div>

    </div>
    )

}



export default Account;

