import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import cls from "classnames";
import styles from "../../styles/coffee-store.module.css";
import { fetchCoffeeStores } from "@/lib/coffee-store";

import { StoreContext} from '../../context/store-context'

import { isEmpty } from "../../utils";
import useSWR from "swr";

// getStaticProps function here //
export async function getStaticProps(staticProps) {
  
  const params = staticProps.params;
  const coffeeStores = await fetchCoffeeStores();
  const findCoffeeStoreById = coffeeStores.find((coffee) => {
    return coffee.id.toString() === params.id; //dynamic id
  });
  return {
    props: {
      coffee: findCoffeeStoreById  ? findCoffeeStoreById : {},
    },
  };}
export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}


// this is the component 
const CoffeeStore = (initialProps) => {
  const router = useRouter();
   const id = router.query.id;

   const [coffeeStore, setCoffeeStore] = useState(
    initialProps.coffee || {}
  );

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  const handleCreateCoffeeStore = async (cf) =>{
    try{
      const {
        id,
        name,
        voting,
        address,
        neighbourhood,
        imgUrl
      } = cf

      const response = await fetch('/api/createCoffeeStores', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          address,
          neighbourhood,
          voting,
          imgUrl
        })
      })

      const dbCoffeeStore = await response.json();
    }catch(err){
      console.error("Error Ocurred:", err)
    }
  }

  useEffect(() => {
    if (isEmpty(initialProps.coffee)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
          return coffeeStore.id.toString() === id; //dynamic id
        });
        setCoffeeStore(findCoffeeStoreById);
        handleCreateCoffeeStore(findCoffeeStoreById)
      }
    }else{
      handleCreateCoffeeStore(initialProps.coffee)
    }
  }, [id, initialProps, initialProps.coffee, coffeeStores]);

  const { name=" ", address=" ", neighbourhood=" ", imgUrl="" } = coffeeStore;
  const [vote ,setVote] = useState(0);

  const fetcher = (url) => fetch(url).then(res => res.json());
  const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher)

  const handleUpvoteButton = async() => {

   
      try{ 
        const response = await fetch('/api/votingCoffeeStoreById', {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          })
        })
        const dbCoffeeStore = await response.json();
      
        if(dbCoffeeStore && dbCoffeeStore.length > 0){
          let count = vote + 1
          setVote(count); 
        }
  
      }catch(err){
        console.error("Error Ocurred:", err)
      }
  
  };

  useEffect(() =>{

    if(data && data.length > 0){
      setCoffeeStore(data[0])
      setVote(data[0].voting)
    }

  }, [data])

  if(error){
    return <div>Something Went Wrong!!</div>
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div  className={styles.backToHomeLink}>
            <Link href="/" className={styles.backToHomeLink}>
              Back to home          
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={imgUrl || "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"}
            width={500}
            height={300}
            className={styles.storeImg}
          
          />
        </div>

        <div className={styles.col2}>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src="/images/icons/places.svg" width="24" height="24" />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/images/icons/nearMe.svg" width="24" height="24" />
            <p className={styles.text}>{neighbourhood}
</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src="/images/icons/star.svg" width="24" height="24" />
            <p className={styles.text}>{vote}</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
    </div>
    )}


     export default CoffeeStore