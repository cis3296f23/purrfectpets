import React from "react"
import { useState, useEffect } from 'react'
import Petfinder from'../Utils/Petfinder'
import {Component} from "react"
import './UserPreferences.css'


function UserPreferences() {
    const [pets, setPets] = useState([]);

  useEffect(() => {
    Petfinder.getAccessToken().then(() => {
      Petfinder.getTypes().then(pets => {
        setPets(pets);
      });
    });
  }, []);
    

    return <up className=" userPreferences">
            <>
                <Dropdown>
                <Element
                name = "Dogs">
                    <Preferences
                    name = "Big"
                    />
                </Element>
                <Element
                    name = "Cat"/>
                <Element
                    name = "Fish"/>
                </Dropdown>
            </>
        </up>



}

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

function Element(props){
    const[display, setDisplay] = useState('none')
    function handleClick(){
        if (display == 'none'){
            setDisplay('none')
        }else{
            setDisplay('block')
        }

    }
    var content = props.name
    return(
        <div onClick={handleClick}>
            {content}
            <div style = {{display:display}}>
                {props.children}
            </div>

        </div>
    )
}

function Preferences(props){
    var content = props.name
    return(
        <div>
            {content}
        </div>
    )

}

function DropDownButton (props){
    var content = props.content;
    var handleClick = props.onClick;
    return(
        <div>
            <div>
                {content}
            </div>
        </div>
    )
}



export {DropDownButton}
export {Element}
export{Preferences}

export {Dropdown}


export default UserPreferences;