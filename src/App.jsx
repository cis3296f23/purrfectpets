import { useState, useEffect } from 'react'
import Petfinder from'./Utils/Petfinder'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import logo from './assets/PetFinderLogo.png'



function App() {
  const [count, setCount] = useState(0)
  const [pets, setPets] = useState([]);

  useEffect(() => {
    Petfinder.getAccessToken().then(() => {
      Petfinder.getPets().then(pets => {
        setPets(pets);
      });
    });
  }, []);

  return (
    <>
      <div>
        <a href="https://www.petfinder.com/" target="_blank">
          <img src= {logo} className="logo" alt="PetFinder logo" />
        </a>
      </div>
      <h1>Find your Purrfect Pet</h1>
      <div className="card">
        <button onClick={Petfinder.getPets}>
          count is {count}
        </button>
      </div>
      <li>
        <ul style={{listStyle: 'none'}}>
          {pets.filter(pet => pet.photos[0]?.medium).map(pet => (
            <li key={pet.id} className="pet-details">
              <div className="pet-image-container">
                <img 
                src={pet.photos[0]?.medium} 
                alt={pet.name} 
                onError={(e) => {
              e.target.style.display = 'none'; // Hide the image on error
          }}/>
              </div>
              <div className="pet-info">
                <p><strong>Name: {pet.name}</strong></p>
                <p><strong>Type: {pet.type}</strong></p>
                <p><strong>Age: {pet.age}</strong></p>
              </div>
            </li>
          ))}
        </ul>
      </li>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
