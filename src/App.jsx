import { useState } from 'react'
import Petfinder from'./Utils/Petfinder'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import logo from './assets/PetFinderLogo.png'



function App() {
  const [count, setCount] = useState(0)

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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
