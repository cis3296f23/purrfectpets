import React from "react"
import { useState, useEffect, useRef } from 'react'
import Petfinder from'../Utils/Petfinder'
import {Component} from "react"
import './UserPreferences.css'
import logo from '../assets/PetFinderLogo.png'

/*
    const [pets, setPets] = useState([]);

  useEffect(() => {
    Petfinder.getAccessToken().then(() => {
      Petfinder.getTypes().then(pets => {
        setPets(pets);
      });
    });
  }, []);
  */

  function UserPreferences() {

    const [open, setOpen] = useState(false);
    const[display, setDisplay] = useState('none')

    const checkList = ["Dog", "Cat", "Rabbit", "Small & Furry", "Horse", "Bird", "Scales, Fins & Other", 
"Barnyard", "Good with Children", "Good with Dogs", "Good with Cats", "House Trained", "Special Needs"];
    const [checked, setChecked] = useState([]);

    // Add/Remove checked item from list
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    // Return classes based on whether item is checked
    const isChecked = (item) =>
        checked.includes(item) ? "checked-item" : "not-checked-item";

    // Generate string of checked items
    var checkedItems = checked.length
        ? checked.reduce((total, item) => {
            return total + ", " + item;
        })
        : "";

    function handleClick(){

        if (display == 'none'){
            setDisplay('block')
        }else{
            setDisplay('none')
        }

    }
  
    let menuRef = useRef();
  
    useEffect(() => {
      let handler = (e)=>{
        if(!menuRef.current.contains(e.target)){
          setOpen(false);
          console.log(menuRef.current);
        }      
      };
  
      document.addEventListener("mousedown", handler);
      
  
      return() =>{
        document.removeEventListener("mousedown", handler);
      }
  
    });
  
    return (
      <div className="UserPreferences">
        <div className='Menu' ref={menuRef}>
          <div className='Dropdown' onClick={handleClick}>
            <h3> User Preferences </h3>
          </div>
  
          <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} style = {{display:display}}>
            <ul>
                {checkList.map((item, index) => (
                    <div key={index}>
                        <input value={item} type="checkbox" onChange={handleCheck}/>
                        <span className={isChecked(item)}>{item}</span>

                    </div>
                ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

function Element(props){
/*
    const[display, setDisplay] = useState('none')
    function handleClick(){
        if (display == 'none'){
            setDisplay('none')
        }else{
            setDisplay('block')
        }

    }
*/
    var content = props.name
    return(
        <li>
            <a>{content}</a>
        </li>
    )
}

/*
function Dropdown(props){
    const[display, setDisplay] = useState('none')
    function handleClick(){

        if (display == 'none'){
            setDisplay('block')
        }else{
            setDisplay('none')
        }

    }
    return(
        <div onClick={handleClick}>
            User Preferences
            <div style = {{display:display}}>
                {props.children}
            </div>
        </div>
    )

}
*/

export {Element}


export default UserPreferences;