import React from "react";
import AppLike from "../assets/App like.png";
import AppDislike from "../assets/App dislike.png";
import SideBar from "./AccountComponents/Sidebar";



/**
 * Help component for the help page that shows how to like and dislike pets.
 * @component
 * @returns {JSX.Element} The rendered Help component.
 */

export default function Help() {

    return (
        <div
        style={{display: 'flex', height: '100vh'}}>
            <SideBar/> 
            <div style={{ textAlign: "center" }}
            className="help">
                <h1>Help Page </h1>
                <p>Welcome to the help page</p>

                <h2>Like and Dislike</h2>

                <p>To like a pet, click on the thumbs up button</p>
                <img style={{ width: "30%" }}
                src={AppLike} alt="" />
                
                <p>To dislike a pet, click on the thumbs down button</p>
                <img style={{ width: "30%" }}
                src={AppDislike} alt="" />
            </div>
        </div>
    );
}