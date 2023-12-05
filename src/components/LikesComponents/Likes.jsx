import { useState, useEffect } from 'react'

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
            const likesData = await response.json();
            console.log("likesData: ", likesData); // log the likes data
            const likesArray = likesData.split(',');
            console.log("likesArray: ", likesArray)
            setLikes(likesArray)
        };
        fetchLikes();
    }, []);

    return (
        <div>
            <h1>Likes</h1>
            {likes.map((like, index) => (
                <div key={index}>
                    <p>{like}</p>
                </div>
            ))}
        </div>
    );
}

export default Likes;