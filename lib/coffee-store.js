import { createApi } from 'unsplash-js';


const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_API,

});

//  tbis will fetch all the photos that we are requesting from the api
const getListOfCoffeeStoresPhotos  = async () =>{
  const photos = await unsplash.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 30, 
  });

  const unsplashPhotos = photos.response.results.map(r => r.urls["small"]);
  return unsplashPhotos;
}
// this is the url to fetch
const getUrlForCoffeeStores  = (query, limit, latLong) =>{
    return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}

export const fetchCoffeeStores = async (latLong = "42.36067344722998,-71.06679013276447" , limit = 6 ) => {

    const photos = await getListOfCoffeeStoresPhotos();

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: process.env.NEXT_PUBLIC_API
        }
      };
      
      const response = await fetch(getUrlForCoffeeStores("coffee", limit , latLong ), options)
      const data =  await response.json();
      return data.results.map((result, index) => {
        const neighborhood = result.location.formatted_address;
        return {
          id: result.fsq_id,
          address: result.location.address,
          name: result.name,
          neighbourhood: neighborhood?.length > 0 ? neighborhood : "",
          imgUrl : photos[index]
        }
      });
    
}