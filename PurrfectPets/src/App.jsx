import { useState } from 'react'
import './App.css'
import logo from './assets/PetFinderLogo.png'
import NavBar from './components/navbar'



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
        <button onClick={() => setCount((count) => count + 1)}>
          Pets Matched : {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on PetFinder to learn more
      </p>
      <NavBar />
    </>
  )
}

export default App
