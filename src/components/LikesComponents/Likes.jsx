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

            const likesData = await response.text(); //should return liked pet ids
            console.log("likesData: ", likesData);

            const petResponse = await fetch(`/Petfinder/likedPets/${likesData}`);
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