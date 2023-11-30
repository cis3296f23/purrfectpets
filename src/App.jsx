import { useState, useEffect } from 'react'
import './App.css'
import logo from './assets/PetFinderLogo.png'
import checkmark from './assets/checkmark.png'
import xmark from './assets/xmark.png'
import NavBar from './components/navbar'
import { prefsToInt } from '../utils/encodeDecodeUserPrefs'
//import UserPreferences from './components/UserPreferences'

function App() {
  const [pets, setPets] = useState([]);
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPreferences, setUserPreferences] = useState([]);

  useEffect(() => {
    // temp user prefs
    let userPrefs = ['Dog', 'Cat', 'Small & Furry', 'Scales, Fins & Other', 'Barnyard', 'good_with_children', 'house_trained'];
    let prefs = prefsToInt(userPrefs);
    //
    fetch(`/Petfinder/${currentPage}/${prefs}`) // 2507 is temp test value
      .then(res => res.json())
      .then(data => setPets(data))
  }, [currentPage]);

  const nextPet = () => {
    if (currentPetIndex < pets.length - 1) {
      console.log(currentPetIndex)
      console.log(pets[currentPetIndex]);
      setCurrentPetIndex(currentPetIndex + 1);
    } else {
      setCurrentPage(currentPage + 1);
      setCurrentPetIndex(0);
    }
  };

  const handleDislike = () => {
    setUserPreferences([...userPreferences, { id: pets[currentPetIndex].id, preference: 'dislike' }])
    nextPet();
  }
  const handleLike = () => {
    setUserPreferences([...userPreferences, { id: pets[currentPetIndex].id, preference: 'like' }])
    nextPet();
  }

  //console log userPreferences
  useEffect(() => {
    console.log(userPreferences)
  }, [userPreferences]) //only runs when userPreferences changes, console log userPreferences


  return (
    <>
      <div className="app-container">
        <ul style={{ listStyle: 'none' }} className="pet-details">
          {pets[currentPetIndex] && (
            <li key={pets[currentPetIndex].id}>
              <div className="pet-image-container">
                <img
                  src={pets[currentPetIndex].photos[0]?.large}
                  alt={pets[currentPetIndex].name}
                  onError={(e) => {
                    e.target.style.display = 'none'; // Hide the image on error
                  }}
                />
              </div>
              <p className="pet-name"><strong>{pets[currentPetIndex].name}</strong></p>
              <p className="pet-desc"><strong>{pets[currentPetIndex].description}</strong></p>
              <p className="pet-tags"><strong>{pets[currentPetIndex].tags.join(', ')}</strong></p>
            </li>
          )}
        </ul>
          <ul style={{ listStyle: 'none' }} className="pet-info">
          {pets[currentPetIndex] && (
            <li>
              <div className="pet-info">
                <p><strong>Type: {pets[currentPetIndex].type}</strong></p>
                <p><strong>Age: {pets[currentPetIndex].age}</strong></p>
                <p><strong>Gender: {pets[currentPetIndex].gender}</strong></p>
                <p><strong>Primary Breed: {pets[currentPetIndex].breeds.primary}</strong></p>
                <p><strong>Primary Color: {pets[currentPetIndex].colors.primary}</strong></p>
                <p><strong>Size: {pets[currentPetIndex].size}</strong></p>
                <p><strong>Coat: {pets[currentPetIndex].coat ? pets[currentPetIndex].coat : "N/A"}</strong></p>
                <p><strong>House Trained: {pets[currentPetIndex].attributes.house_trained ? "Yes" : "No"}</strong></p>
                <p><strong>Good With Children: {pets[currentPetIndex].attributes.good_with_children ? "Yes" : "No"}</strong></p>
                <p><strong>Declawed: {pets[currentPetIndex].attributes.declawed ? "Yes" : "No"}</strong></p>
                <p><strong>Special Needs: {pets[currentPetIndex].attributes.special_needs ? "Yes" : "No"}</strong></p>
                <p><strong>Spayed/Neutered: {pets[currentPetIndex].attributes.spayed_neutered ? "Yes" : "No"}</strong></p>
                <p><strong>Shots Current: {pets[currentPetIndex].attributes.shots_current ? "Yes" : "No"}</strong></p>
                <p><strong>Good with children: {pets[currentPetIndex].environment.children ? "Yes" : "No"}</strong></p>
                <p><strong>Good with dogs: {pets[currentPetIndex].environment.dogs ? "Yes" : "No"}</strong></p>
                <p><strong>Good with cats: {pets[currentPetIndex].environment.cats ? "Yes" : "No"}</strong></p>
                <p><strong>Email: {pets[currentPetIndex].contact.email ? pets[currentPetIndex].contact.email : "N/A"}</strong></p>
                <p><strong>Phone: {pets[currentPetIndex].contact.phone ? pets[currentPetIndex].contact.phone : "N/A"}</strong></p>
                <p><strong>Address: {pets[currentPetIndex].contact.address.city}</strong></p>
                <p><strong>State: {pets[currentPetIndex].contact.address.state}</strong></p>
                <a href={pets[currentPetIndex].url} target="_blank" rel="noopener noreferrer">
                Learn More
                </a>
              </div>
            </li>
            )}
          </ul>
          <div className="button-options">
          </div>
          <p className="read-the-docs">
          </p>
        </div>
    </>
  );
}

export default App