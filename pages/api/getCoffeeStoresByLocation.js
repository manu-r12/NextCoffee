import { fetchCoffeeStores } from "@/lib/coffee-store";
const getCoffeeStoresByLocation  = async (req, res) =>{

    try{
    const {latLong, limit} = req.query
    const response =  await fetchCoffeeStores(latLong, limit);
    res.status(200)
    res.json(response)
    }catch(error){
        console.log("There is an Erorr", error)
        res.status(500)
         res.json("OH! ,Something Went Wrong!!")

    }
}



export default getCoffeeStoresByLocation;