import React from "react"
import { useState, useEffect, useRef } from 'react'
import './UserPreferences.css'

let preference_list = [];

/**
 * The User Preferences component of the application. A dropdown list consisting of types and animals and their attributes.
 * The user can click on them to filter what the website shows so they only see the pets they're looking for.
 * @component
 */
const UserPreferences = (props) => {

  const [open, setOpen] = useState(false);
  const [display, setDisplay] = useState('none')

  let checkList = ["Dog", "Cat", "Rabbit", "Small & Furry", "Horse", "Bird", "Scales Fins & Other",
    "Barnyard", "Good with Children", "Good with Dogs", "Good with Cats", "House Trained", "Special Needs"];
  const [checked, setChecked] = useState([]);

   /**
   * Adds or removes a checked or unchecked item to and from the list of checked items.
   *
   * @param {Object} event - The list of user preferences.
   * @function
   */
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  /**
   * Returns items based on whether or not the item is checked
   * @param {Object} item - The item in the checklist.
   * @function
   */
  const isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  // Generates a string of checked items
  var checkedItems = checked.length
    ? checked.reduce((total, item) => {
      return total + ", " + item;
    })
    : "";

   /**
   * Submits a list of all checked items. Function fires when the user clicks on "Submit Preferences"
   * @function
   */
  const handleSubmit = () => {
    props.onSubmit(preference_list);
  };
 /**
   * Opens and closes the User Preferences menu when the user clicks on it.
   * @function
   */
  function handleClick() {
    if (display == 'none') {
      setDisplay('block')
    } else {
      setDisplay('none')
    }
  }

  let menuRef = useRef();

   /**
   * Unused function that closes the menu when the user clicks outside of it. Doesn't really work for some reason.
   * @function
   */
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

  /**
   * The submission button for the User Preferences menu. Sets the preferences that the user selects.
   *
   * @param {Object} props - List of checked items.
   */

function Element(props) {
  return (
    <div>
      <div className="Dropdown" onClick={() => pref_changer(props.preferences)}> Set Preferences</div>
    </div>
  )}

  /**
   * Changes the list of preferences to only contain the checked items the user selected.
   *
   * @param {Array} pref_list - The list of user preferences.
   * @function
   */
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