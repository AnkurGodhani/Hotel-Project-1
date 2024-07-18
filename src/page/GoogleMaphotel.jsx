import React from 'react'
import GoogleMapReact  from 'google-map-react';


const GoogleMaphotel = ({googleLocation}) => {
    // TODO: craete all New user 
    const defaultProps = {
        center: {
          lat: 59.955413,
          lng:30.337844
        },
        zoom: 11
      };
const AnyReactComponent = ({ text }) => <div>{text}</div>;
    
  return (
    <div className='p-5'>
         <div style={{ height: '100vh', width: '100%' }} className=' shadow-lg overflow-hidden rounded-lg'>
                <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCuGCzvUOTSLNrYy-8FNSLZpSOu_12Jpc0" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                lat={59.955413}
                lng={30.337844}
                text="My Marker"
                />
            </GoogleMapReact>
         </div>
    </div>
  )
}

export default GoogleMaphotel