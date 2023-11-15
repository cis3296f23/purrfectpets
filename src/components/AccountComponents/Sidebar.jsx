import React from "react";
import './Account.scss'
import ProfilePic from '../../assets/ProfilePic.png'



function SideBar(){


    const sideBarItems = [
        {
            title: "Home",
            icon: <img src={ProfilePic} alt="" />,
            link: "/App"

        },
        {
            title: "Account",
            icon: <img src={ProfilePic} alt="" />,
            link: "/Account"

        },
        
        {
            title: "Settings",
            icon: <img src={ProfilePic} alt="" />,
            link: '/Settings'

        },
        {
            title: "Help",
            icon: <img src={ProfilePic} alt="" />,
            link:'/Help'

        },
        {
            title: "Logout",
            icon: <img src={ProfilePic} alt="" />,
            link: '/Login'

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