import React from "react"
import {useState} from "react"


function UserPreferences() {

    return <up className=" userPreferences">
            <>
                <Dropdown>
                <Element/>
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
    onClick = {this:handleClick}
    return(
        <div>
            User Preferences
            <div style = {{display:display}}>
                props.children
            </div>
        </div>
    )

}

function Element(){
    var content = props.name
    return(
        <div>
            GET https://api.petfinder.com/v2/animals
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

export {Dropdown}


export default UserPreferences;