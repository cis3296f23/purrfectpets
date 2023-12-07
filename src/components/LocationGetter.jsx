import React from "react"
import { useState, useEffect, useRef } from 'react'
import './UserPreferences.css'

const LocationGetter = () => {

    const [location, setLocation] = useState({
        loaded: false,
        coordinates: {lat: "", lng: ""} 
    });

    const onSuccess = location => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude, 
                lng: location.coords.longitude,
            }
        });

    };

    const onError = error => {
        setLocation({
            loaded: false,
            error,
        });

    };

    useEffect(() => {

        if( !("geolocation" in navigator)){
            setLocation((state) => ({
                ...state,
                loaded: true,
                error: {
                    code: 0,
                    message: "Geolocation not supported",
                }
            }));

            
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);


    }, [])



  return location;
}

export default LocationGetter;