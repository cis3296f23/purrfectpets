import { useState, useEffect } from 'react'
import SideBar from "../AccountComponents/Sidebar.jsx"
import './Likes.css'
import Card from 'react-bootstrap/Card'; //bootstrap card

function Likes(){
    const [likes, setLikes] = useState([])

    useEffect(() => {
        const fetchLikes = async () => {
            const email = sessionStorage.getItem("userinfo");
            console.log('email: ', email)

            const response = await fetch(`/users/likes/${email}`, { method: 'GET' });
            console.log("response: ", response); 

            let likesData = await response.text(); //should return liked pet ids
            console.log("likesData: ", likesData);
            likesData = likesData.replace(/"/g, '');
            likesData = likesData.replaceAll(",","-")
            console.log("new likesData:", likesData)
            const url = `/Petfinder/likedPets/${likesData}`
            console.log("/Petfinder/likedPets/${likesData}: ", url)
            const petResponse = await fetch(url); //fetch pet details from petfinder
            console.log("petResponse: ", petResponse)

            const petDetails = await petResponse.json();
            console.log("petDetails: ", petDetails)
            setLikes(petDetails);

        };
        fetchLikes();
    }, []);

    return (
        <div className="likes-container">
            <SideBar />
            <div className="likes">
                <div className="user-likes">
                    <h1>Your Likes</h1>
                    <div className="likes-display">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Likes;