import React from "react"


function NavBar() {

    return <nav className=" navBar">

            <button className="account-nav" onClick={()=>{
                window.location.pathname = '/Account'

            }}>Account</button>
            <button className="login-nav" onClick={()=>{
                window.location.pathname = '/'

            }}>Logout</button>
        </nav>



}


export default NavBar;