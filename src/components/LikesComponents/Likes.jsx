import { useState, useEffect } from 'react'
import SideBar from "../AccountComponents/Sidebar.jsx"
import './Likes.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
            const url = `/Petfinder/liked/${likesData}`
            console.log("/Petfinder/liked/${likesData}: ", url)
            const petResponse = await fetch(`${url}`); //fetch pet details from petfinder
            console.log("petResponse: ", petResponse)

            const petDetails = await petResponse.json();
            console.log("petDetails: ", petDetails)
            setLikes(petDetails);

        };
        fetchLikes();
    }, []);


    function decodeHtmlEntity(str) {
        let textArea = document.createElement('textarea');
        textArea.innerHTML = str;
        let decodedStr = textArea.value;
        textArea.innerHTML = decodedStr;
        return textArea.value;
    }

    
    const uniqueLikes = Array.from(new Set(likes.map(like => like.animal.id)))
    .map(id => likes.find(like => like.animal.id === id));
    
    return (
        <div className="likes-container">
            <SideBar />
            <div className="likes">
                <div className="user-likes">
                    <h1>Your Likes</h1>
                    <div className="likes-display">
                    {uniqueLikes.map((item) => {
                        const pet = item.animal;
                        if (pet) {  // check if the pet object is not null
                            return (
                                <Card style={{width: '18rem', margin: '1rem', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s', backgroundColor: 'vanilla'}} key={pet.id}>
                                    <Card.Img variant="top" src={pet.photos && pet.photos.length > 0 ? pet.photos[0].medium : 'defaultImageURL'} />
                                    <Card.Body>
                                        <Card.Title>{pet.name}</Card.Title>
                                        <Card.Text>
                                            {decodeHtmlEntity(pet.description)}
                                        </Card.Text>
                                        <Button variant="primary" href={pet.url} target="_blank">View</Button> 
                                    </Card.Body>
                                </Card>
                            );
                        }
                    })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Likes;