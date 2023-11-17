import React from "react";
import './Account.scss'
import ProfilePic from '../../assets/ProfilePic.png'
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ChecklistIcon from '@mui/icons-material/Checklist';
import HelpIcon from '@mui/icons-material/Help';
import LogoutIcon from '@mui/icons-material/Logout';




function SideBar(){


    const sideBarItems = [
        {
            title: "Home",
            icon: <HomeIcon/>,
            link: "/App"

        },
        {
            title: "Account",
            icon : <AccountBoxIcon/>,
            link: "/Account"

        },
        
        {
            title: "Preferences",
            icon: <ChecklistIcon/>,
            link: '/preferences'

        },
        {
            title: "Help",
            icon: <HelpIcon/>,
            link:'/Help'

        },
        {
            title: "Logout",
            icon: <LogoutIcon/>,
            link: '/'

        }
        

    ]

    return(
        <div className="sideBar">

            <ul className="list-group">
                {sideBarItems.map((val,key)=>{
                    return(
                        <li key = {key} 
                        className="list-item"
                        id = {window.location.pathname == val.link? "active": ""}
                        onClick={() => {
                            window.location.pathname = val.link
                        }}>

                            <div id="icon">{val.icon}</div>
                            <div id = 'title'>{val.title}</div>
                            </li>
                    )
                })}
            </ul>
            
        </div>
    )
}

export default SideBar