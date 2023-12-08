import { useState, useEffect } from 'react'
import './App.css'
import NavBar from './components/navbar'
import { prefsToInt } from '../utils/encodeDecodeUserPrefs'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserPreferences from './components/UserPreferences'
import LocationGetter from './components/LocationGetter'
library.add(faThumbsUp, faThumbsDown);

/**
 * The main App component of the application. Displays current pet with details and a like or dislike button.
 * 
 *
 * @component
 * @returns {JSX.Element} The rendered App component.
 */
function App() {


  const [modal, setModal] = useState(false);

  /**
   * Toggles whether the modal is displayed or not
   * @function
   */
  const toggleModal = () => {
    setModal(!modal);
  };




  const [pets, setPets] = useState([]);
  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [userPreferences, setUserPreferences] = useState([]);
  //User info
  const [userName, getUsername] = useState('')
  const [email, getEmail] = useState('')
  const [userID, getUserID] = useState('')
  const location = LocationGetter();

  
  /**
   * A React hook that takes the users' preferences and fetches pets from PetFinder to display
   * 
   * @memberof module:React
   */
  useEffect(() => {
    // temp user prefs
    let userPrefs = ['Dog', 'Cat', 'Small & Furry', 'Scales, Fins & Other', 'Barnyard', 'good_with_children', 'house_trained'];
    let prefs = prefsToInt(userPrefs);
    //
    fetch(`/Petfinder/preferences/${currentPage}/${prefs}`) // 2507 is temp test value
      .then(res => res.json())
      .then(data => setPets(data))
  }, [currentPage]);
  let userEmail

  //fetch user data from database
  if (typeof window !== 'undefined') {
    // Perform sessionStorage action
    userEmail =  sessionStorage.getItem("userinfo")
    console.log(`User Email: ${userEmail}`)
  }
      
  /**
   * A React hook that fetches the user data and stores it in sessionStorage
   * 
   * @memberof module:React
   */    
  useEffect(() => {
      const fetchUserData = async () => {
      try {
          const response = await fetch(`/users/userInfo/${userEmail}`,{method: 'GET'});
          const userData = await response.json();
          console.log('User Data:', userData);

          getUsername(userData.username);
          getEmail(userData.email);
          getUserID(userData.id);
      } catch (error) {
      console.error('Error fetching user data:', error);
      }
    }; 
  fetchUserData();
  }, []);

  /**
   * Asynchronously handles the like action for the current pet.
   * Adds the current pet to the user preferences with a preference of 'like'.
   * Then moves to the next pet.
   *
   * @async
   * @function handleLike
   * @return {Promise} Resolves when the like action has been handled.
   */
  const handleLike = async () => {
    // Get the petID from the current pet
    const petID = pets[currentPetIndex].id;
    console.log(`PetID: ${petID}`);
    console.log(`UserID: ${userID}`);
    try{
        let option = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }
    
        const response = await fetch(`/users/liked/${userID}/${petID}`,option);
        const data = await response.json();
        console.log('User Data:', data);
    } 
    catch (error) {  
        console.error('Error updating user data:', error);
    }
    finally {
      nextPet();
    }
  }

  /**
   * Handles the process of getting the next pet.
   * Displays the next pet on the page or displays the first pet on the next page.
   * @function nextPet
   */
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

  /**
   * Handles the dislike action for the current pet.
   * Adds the current pet to the user preferences with a preference of 'dislike'.
   * Then moves to the next pet.
   *
   * @function handleDislike
   */
  const handleDislike = () => {
    setUserPreferences([...userPreferences, { id: pets[currentPetIndex].id, preference: 'dislike' }])
    nextPet();
  }
  // const handleLike = () => {
  //   //change where we store the pet ID to store in DB for the user and reference later in the bookmark page
  //   setUserPreferences([...userPreferences, { id: pets[currentPetIndex].id, preference: 'like' }])
  //   nextPet();
  // }
  /**
   * A React hook that takes logs the users preferences on change
   * 
   * @memberof module:React
   */    
  useEffect(() => {
    console.log(userPreferences)

    

  }, [userPreferences]) //only runs when userPreferences changes, console log userPreferences
    
  /**
   * Fetches the user's pet preferences from the server and updates the state.
   *
   * @param {Array} pref_list - The list of user preferences.
   * @function getPreferences
   */
  const getPreferences = (pref_list) =>{
    let prefs = prefsToInt(pref_list);
    //
    fetch(`/Petfinder/preferences/${currentPage}/${prefs}`) // 2507 is temp test value
      .then(res => res.json())
      .then(data => setPets(data))
  }
  //getPreferences(userPreferences)



  /**
   * Decodes HTML entities in a string.
   *
   * @param {string} str - The string with HTML entities.
   * @function decodeHtmlEntity
   * @returns {string} The decoded string.
   */
  function decodeHtmlEntity(str) {
    let textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    let decodedStr = textArea.value;
    textArea.innerHTML = decodedStr;
    return textArea.value;
  }
  
  return (
    <>
    <NavBar />
      <div className="app-container">
        <ul style={{ listStyle: 'none' }} className="pet-details">
          {pets[currentPetIndex] && (
            <li key={pets[currentPetIndex].id}>
              <div className="pet-image-container">
                <img
                  src={pets[currentPetIndex].photos[0]?.medium}
                  alt={pets[currentPetIndex].name}
                  onError={(e) => {
                    e.target.style.display = 'none'; // Hide the image on error
                  }}
                />

              </div>
              <p className="pet-name"><strong>{pets[currentPetIndex].name}</strong></p>
              <p className="pet-desc"><strong>{decodeHtmlEntity(pets[currentPetIndex].description)}</strong></p>
              <p className="pet-tags"><strong>{pets[currentPetIndex].tags.join(', ')}</strong></p>
            </li>
          )}
        </ul>
        <div className="info-like-dislike">
          <ul style={{ listStyle: 'none' }} className="pet-info">
          {pets[currentPetIndex] && (
            <li>
              <div className="pet-info">
                <div className="animal-info">
                  <h1>Pet Info</h1>
                  <div className="info-list">
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
                  </div>
                </div>
                <div className="contact-info">
                  <h1>Additional Info</h1>
                  <p><strong>Email: {pets[currentPetIndex].contact.email ? pets[currentPetIndex].contact.email : "N/A"}</strong></p>
                  <p><strong>Phone: {pets[currentPetIndex].contact.phone ? pets[currentPetIndex].contact.phone : "N/A"}</strong></p>
                  <p><strong>City: {pets[currentPetIndex].contact.address.city}</strong></p>
                  <p><strong>State: {pets[currentPetIndex].contact.address.state}</strong></p>
                  <p><strong>Published At: {pets[currentPetIndex].published_at}</strong></p>
                  <a href={pets[currentPetIndex].url} target="_blank" rel="noopener noreferrer" className="learn-more">
                  Learn More
                  </a>
                  <div>
                  Current Location: 
                  {location.loaded ? JSON.stringify(location.coordinates) : "Location data not available yet"}
                  </div>
                </div>
              </div>
            </li>
            )}
          </ul>
          <div className="like-dislike">
            <FontAwesomeIcon icon="thumbs-down" onClick={handleDislike} />
            <FontAwesomeIcon icon="thumbs-up" onClick={handleLike} />
          </div>
          <p className="read-the-docs">
          </p>
        </div>
      </div>
      <button onClick={toggleModal} className="btn-modal">
        preferences
      </button>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
          <UserPreferences onSubmit={getPreferences}/>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
      <footer>
    <a href="https://www.flaticon.com/free-icons/cats" title="cats icons" style={{ color: '#ffffff' }}>Cats icons created by Freepik - Flaticon</a>
    </footer>
      </>
  );
}

export default App
