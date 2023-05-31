import { table, getRecord } from "../../lib/airtable";
const getCoffeeStoresById = async (req, res) =>{

    const {id} = req.query

    try{

        if(id){

            const findCoffeeStoreRecords = await table
            .select({
              filterByFormula: `id="${id}"`,
            })
            .firstPage();   
          if (findCoffeeStoreRecords.length !== 0) {
                const records = getRecord(findCoffeeStoreRecords);
        
                res.json(records);
          }else
          res.json({message: "Could Not Be Found"})
        }else
        res.json({message: "Id is Missing : ' " })


    }catch(error){
        console.error("Something wnet wrong")
    }


}



export default getCoffeeStoresById;