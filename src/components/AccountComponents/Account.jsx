import React from "react";
import { useState,useEffect } from "react";
import './Account.scss'
import SideBar from "./Sidebar";
import FaceIcon from '@mui/icons-material/Face';
import EditIcon from '@mui/icons-material/Edit';






function Account(){

    const [userName, getUsername] = useState("PetLover65")
    const [email, getEmail] = useState('JohnSmith@gmail.com')
    const [petLiked, getPetLiked] = useState('100')
    const[currentLocation, getCurrentLocation] = useState('here')


    return (
    <div className="account-container">
        <SideBar />
        <div className="account">

            <div className="account-info">
            </div>

            <div className="account-user">
                <div className="account-pic-container">
                    <div className="account-pic">
                    <FaceIcon sx={{ fontSize: 150 }}/> 
                    </div>
                    {/* <div className="account-edit"><EditIcon/></div> */}
                </div>

                <div className="userName-container">
                    <div className="account-username"><h2>{userName}</h2></div>
                    {/* <div className="account-edit"><EditIcon/></div> */}
                </div>

                <div className="pet-liked-container">
                    <div className="account-pets"><h3>total pets liked {petLiked}</h3></div>
                    {/* <div className="account-edit"><EditIcon/></div> */}
                </div>

                
                

            </div>
            




        </div>

    </div>
    )

}



export default Account;

