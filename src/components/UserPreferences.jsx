import React from "react"
import { useState, useEffect, useRef } from 'react'
import './UserPreferences.css'

let preference_list = [];

const UserPreferences = (props) => {

  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState('none')

  let checkList = ["Dog", "Cat", "Rabbit", "Small & Furry", "Horse", "Bird", "Scales Fins & Other",
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

  const handleSubmit = () => {
    //console.log("The handle submit function is being used");
    props.onSubmit(preference_list);
  };

  function handleClick() {
    if (display == 'none') {
      setDisplay('block')
    } else {
      setDisplay('none')
    }
  }

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
        console.log(menuRef.current);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    }
  });

  return (
    <div className="UserPreferences">
      <div className='Menu' ref={menuRef}>
        <div className='Dropdown' onClick={handleClick}>
          <h3> User Preferences </h3>
        </div>
        <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`} style={{ display: display }}>
          <ul>
            {checkList.map((item, index) => (
              <div key={index}>
                <input value={item} type="checkbox" onChange={handleCheck} />
                <span className={isChecked(item)}>{item}</span>
              </div>
            ))}
          </ul>
          <div onClick={handleSubmit}>
            <Element name="Set Preference" preferences={checkedItems}></Element>
          </div>
        </div>
      </div>
    </div>
  );
}


function Element(props) {
  return (
    <div>
      <div className="Dropdown" onClick={() => pref_changer(props.preferences)}> Set Preferences</div>
    </div>
  )}

const pref_changer = (new_preferences) => {
  preference_list = new_preferences.split(", ");
  for (var i = 0; i < preference_list.length; i++) {
    if (preference_list[i] == "Scales Fins & Other") { preference_list[i] = "Scales, Fins & Other" };
    if (preference_list[i] == "Good with Children") { preference_list[i] = "good_with_children" };
    if (preference_list[i] == "Good with Dogs") { preference_list[i] = "good_with_dogs" };
    if (preference_list[i] == "Good with Cats") { preference_list[i] = "good_with_cats" };
    if (preference_list[i] == "House Trained") { preference_list[i] = "house_trained" };
    if (preference_list[i] == "Special Needs") { preference_list[i] = "special_needs" };
  }
}

export { preference_list };
export { Element };
export default UserPreferences;