import React from "react"
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

function NavBar() {
const [isOpen, setIsOpen] = useState(false);

return (
<div className="navBar">
    <MenuIcon 
    sx={{ fontSize: 75 }}
    onClick={() => setIsOpen(!isOpen)}
    className = "menuIcon"/>
    {isOpen && (
    <div className="menuIcon-Items">
        <p onClick={() =>{
            window.location.pathname = '/Account'
            }}>Account</p>
            <p onClick={() =>{
            window.location.pathname = '/Likes'
            }}>Likes</p>
            <p onClick={() =>{
            window.location.pathname = '/Help'
            }}>Help</p>
            <p onClick={() =>{
            window.location.pathname = '/'
            }}>Logout</p>
    </div>
    )}
</div>
);
}

export default NavBar;