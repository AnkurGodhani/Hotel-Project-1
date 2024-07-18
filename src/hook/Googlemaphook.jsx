import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react';
import { ImLocation } from "react-icons/im";
import {
    setKey,
    setDefaults,
    setLanguage,
    setRegion,
    fromAddress,
    fromLatLng,
    fromPlaceId,
    setLocationType,
    geocode,
    RequestType,
  } from "react-geocode";

const AnyReactComponent = () => <div><ImLocation size={30} color='red'/></div>;

const Googlemaphook = () => {
    const [latitude,setlatitude] = useState(null)
    const [longitude,setlongitude] = useState(null)
    const defaultProps = {
        center: {
          lat: latitude,
          lng: longitude
        },
        zoom: 11
      };
 
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            setlatitude(latitude)
            setlongitude(longitude)
          });

  return (
    <div className='border-2 rounded-md overflow-hidden cursor-not-allowed'>
          <div style={{ height: '100vh', width: '100%' }} className='cursor-not-allowed'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBhHZWMMM_XlQtDLOVgCOhxWR9Q2eGR0NY" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        
      >
        <AnyReactComponent
          lat={latitude}
          lng={longitude}
        />
      </GoogleMapReact>
    </div>
    
    </div>
  )
}

export default Googlemaphook