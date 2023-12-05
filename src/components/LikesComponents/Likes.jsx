import { useState, useEffect } from 'react'
import SideBar from "../AccountComponents/Sidebar.jsx"
import './Likes.css'

function Likes(){
    const [likes, setLikes] = useState([])

    useEffect(() => {
        const fetchLikes = async () => {
            const email = sessionStorage.getItem("userinfo");
            console.log('email: ', email)
            const response = await fetch(`/users/likes/${email}`, { method: 'GET' });
            console.log("response: ", response); // log the response
            const responseBody = await response.text(); // get the response body as text
            console.log('responseBody: ', responseBody);
            const likesData = responseBody
            console.log("likesData: ", likesData); // log the likes data
            const likesArray = likesData.split(',').map(like => like.trim().replace(/"/g, ''));; // likesData is a string, split by commas
            console.log("likesArray: ", likesArray)
            console.log("Index 0: ", likesArray[0])
            setLikes(likesArray)
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
                    {likes.map((like, index) => (
                        <div key={index}>
                            <p>{like}</p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Likes;