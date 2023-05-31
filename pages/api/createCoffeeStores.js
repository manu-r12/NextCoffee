
import { table, getRecord } from "../../lib/airtable";


// things to consider when updating the data 
// 1. The first argument should be an array of up to 10 record objects.
// 2. Each of these objects should have an id property representing the record ID 

const createCoffeeStore = async (req, res) => {

    const { id , name, address, neighbourhood, voting, imgUrl} = req.body

    //console.log({ req });
    if (req.method === "POST") {
      //find a record
      if(id){   
        try{
      const findCoffeeStoreRecords = await table
        .select({
          filterByFormula: `id="${id}"`,
        })
        .firstPage();
  
      if (findCoffeeStoreRecords.length !== 0) {
            const records = getRecord(findCoffeeStoreRecords);
        res.json(records);
      } else {
        //create a record
        if(name){

            const createRecords = await table.create([
                {
                  fields: {
                    id,
                    name,
                    address,
                    neighbourhood,
                    voting: 0,
                    imgUrl
                  },
                },
              ]);
      
              const records = getRecord(createRecords);
              res.json(records);
        }else{
            res.json("the name is missing")
        }
      
        }
    }catch(er){
        console.error(er);
        res.json("Error Finding ", er)
    }}else{
        res.status(400)
        res.json("ID is missing")
    }
  }else{
    res.json("the Method is GET")
  }
};

export default createCoffeeStore;