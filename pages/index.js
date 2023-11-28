import Head from 'next/head'
import Image from 'next/image'
import StorefrontIcon from '@mui/icons-material/Storefront';
import styles from '@/styles/Home.module.css'
import Banner from '@/components/banner'
import Card from '@/components/card'
import { fetchCoffeeStores } from '@/lib/coffee-store';
import useTrackLocation from '@/hooks/user-location';
import { useEffect, useState, useContext } from 'react';
import { StoreContext , ACTION_TYPES } from '../context/store-context';




// this is a function for getStaticProps


export async  function getStaticProps(context) {
  const coffeeStore = await fetchCoffeeStores();
  return{
    props : { 
      coffeeStore
    }
  }
}

export default function Home(props) {
  const { locationErrorMsg, handleTrackLocation , isFindingLocation} = useTrackLocation()
  const [coffeeStoreErorr , setCoffeeStoreErorr] = useState('')
  const HandleOnBannerClick = () => {
    handleTrackLocation();
   
  }

  const { dispatch, state } = useContext(StoreContext);
 
  const { coffeeStores, latLong } = state;
  useEffect(() => {
    const  setCoffeeStoresByLocation = async () => {

      if (latLong) {
        try {
          const response = await fetch(`/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=10`)
          const coffeeStores =  await response.json();
          dispatch({
            type : ACTION_TYPES.SET_COFFEE_STORES,
            payload : { 
              coffeeStores
            }
          });
        
        } catch (error) {
          //set error
          console.log("Error", { error });
          setCoffeeStoreErorr(error)

        }
      }
    }
    setCoffeeStoresByLocation();
  }, [latLong, dispatch]);

  


 
  return (
    
    <>
      <Head>
        <title>NextCoffee</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
  
      <Banner ButtonText= {isFindingLocation ? "Locating…" : "Search"} handleOnClick = {HandleOnBannerClick}/>
      <div className={styles.image} >
     <Image  src='/images/hero-image.png' width={700} height={400}/>
      </div>
      {coffeeStores.length > 0 &&  ( 
  <>
  <h2 className={styles.heading2}><StorefrontIcon fontSize='200px'/>Stores NearBy</h2>
  <div className={styles.mainLayout}>
        <div className={styles.cardLayout}>
        {coffeeStores.map((cofffe) =>{
            return(<Card
            key = {cofffe.id}
            id = {cofffe.id}
            alt = {cofffe.name}
            name={cofffe.name}
            imgUrl={cofffe.imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"}
            href={`/coffee-store/${cofffe.id}`} />)})}
      </div>
      </div>
      </>
      )}
    {props.coffeeStore.length > 0 &&  ( 
  <>
  <h2 className={styles.heading2}><StorefrontIcon fontSize='200px'/>Boston Stores</h2>
  <div className={styles.mainLayout}>
  <div className={styles.cardLayout}>
        {props.coffeeStore.map((cofffe) =>{
            return(<Card
            key = {cofffe.id}
            name={cofffe.name}
            alt = {cofffe.name}
            imgUrl={cofffe.imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"}
            href={`/coffee-store/${cofffe.id}`} />)})}
      </div>
  </div>
  
      </>
      )}
   
      </main>
    </>
  )
}
