
import { createContext, useReducer } from 'react'

// Context here for the store 
export const StoreContext = createContext();


export const ACTION_TYPES = {
  SET_LATLONG: 'SET_LATLONG',
  SET_COFFEE_STORES : 'SET_COFFEE_STORES'
}

const storeReducer = (state, action) =>{

  const {type, payload} = action;

  switch(type){
    case ACTION_TYPES.SET_LATLONG: {
        return {...state, latLong: payload.latLong}
      }

      case ACTION_TYPES.SET_COFFEE_STORES:  {
        return {...state, coffeeStores: payload.coffeeStores}
      } 

      default:
        throw new Error(`Unhandles tppe ${type}`)
  }

}

// provider 
const StoreProvider  = ({children}) =>{

  const initialStates = {
    latLong: "",
    coffeeStores: []
  }

   const [state, dispatch] = useReducer(storeReducer, initialStates);

 return <StoreContext.Provider value={{state , dispatch}}>{children}</StoreContext.Provider>

}


export default StoreProvider;