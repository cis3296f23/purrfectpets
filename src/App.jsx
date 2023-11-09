import { useState } from 'react'
import Petfinder from'./Utils/Petfinder'
import './App.css'
import logo from './assets/PetFinderLogo.png'
import checkmark from './assets/checkmark.png'
import xmark from './assets/xmark.png'
import NavBar from './components/navbar'

function App() {
  const [pets, setPets] = useState([]);
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPreferences, setUserPreferences] = useState([]);

  useEffect(() => {
    Petfinder.getAccessToken().then(() => {
      Petfinder.getPets(currentPage).then(pets => {
        setPets(pets);
        console.log(pets);
      });
    });
  }, [currentPage]);

  const nextPet = () => {
    if (currentPetIndex < pets.length - 1) {
      console.log(currentPetIndex)
      console.log(pets[currentPetIndex]);
      setCurrentPetIndex(currentPetIndex + 1);
    }else{
      setCurrentPage(currentPage + 1);
      setCurrentPetIndex(0);
    }
  };

  const handleDislike = () => {
    setUserPreferences([...userPreferences, {id: pets[currentPetIndex].id, preference: 'dislike'}])
    nextPet();
  }
  const handleLike = () => {
    setUserPreferences([...userPreferences, {id: pets[currentPetIndex].id, preference: 'like'}])
    nextPet();
  }

  //console log userPreferences
  useEffect(() => {
    console.log(userPreferences)
  }, [userPreferences]) //only runs when userPreferences changes, console log userPreferences


  return (
    <>
    <div className="app-container">
      <div>
        <a href="https://www.petfinder.com/" target="_blank">
          <img src={logo} className="logo" alt="PetFinder logo" />
        </a>
      </div>
      <h1>Find your Purrfect Pet</h1>
      <ul style={{ listStyle: 'none' }}>
        {pets[currentPetIndex] && (
          <li key={pets[currentPetIndex].id} className="pet-details">
            <div className="pet-image-container">
              <img
                src={pets[currentPetIndex].photos[0]?.medium}
                alt={pets[currentPetIndex].name}
                onError={(e) => {
                  e.target.style.display = 'none'; // Hide the image on error
                }}
              />
            </div>
            <div className="pet-info">
              <p><strong>Name: {pets[currentPetIndex].name}</strong></p>
              <p><strong>Type: {pets[currentPetIndex].type}</strong></p>
              <p><strong>Age: {pets[currentPetIndex].age}</strong></p>
              <a href={pets[currentPetIndex].url} target="_blank" rel="noopener noreferrer">
                Learn More
              </a>
            </div>
          </li>
        )}
      </ul>
      <div className="button-options">
        <img src={xmark} width="300" onClick={handleDislike} alt="Dislike"></img>
        <img src={checkmark} width="300" onClick={handleLike} alt="Like"></img>
      </div>
      <p className="read-the-docs">
      </p>
      <footer>
        <a href="https://www.flaticon.com/free-icons/cats" title="cats icons">Cats icons created by Freepik - Flaticon</a>
      </footer>
    </div>
  </>
);
}

export default App;