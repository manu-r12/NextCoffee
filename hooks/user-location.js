import { useState  , useContext} from "react";
import { StoreContext , ACTION_TYPES } from '../context/store-context';
const useTrackLocation = () => {

  const [locationErrorMsg, setLocationErrorMsg] = useState("");

  const [isFindingLocation, setIsFindingLocation] = useState(false);

 


  const {dispatch} = useContext(StoreContext)
  const success = (position) => {


    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // setLatLong(`${latitude},${longitude}`);
   
    dispatch({
        type :  ACTION_TYPES.SET_LATLONG, 
        payload : {latLong: `${latitude},${longitude}`,},

    })
    
    setIsFindingLocation(false);
  };

  const error = () => { // this will throw an error
    setIsFindingLocation(false);
    setLocationErrorMsg("Unable to retrieve your location");
  };

  const handleTrackLocation = () => {
    setIsFindingLocation(true);
   // where is the key to find the
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
      setIsFindingLocation(false);
    } else {
      // status.textContent = "Locating…";
      navigator.geolocation.getCurrentPosition(success, error);
  
};


}
return  {

    handleTrackLocation,
    locationErrorMsg,
    isFindingLocation,
  }}


export default useTrackLocation;