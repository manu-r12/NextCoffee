import {table, getRecord} from "../../lib/airtable"
const votingCoffeeStoreById = async (req, res) =>  {
    if(req.method === "PUT"){
        try{
            const {id} = req.body
   
            if(id){

                const findCoffeeStoreRecords = await table
                .select({
                  filterByFormula: `id="${id}"`,
                })
                .firstPage();   

              if (findCoffeeStoreRecords.length !== 0) {
                    const records = getRecord(findCoffeeStoreRecords);
                    const record = records[0]
                    const calculateVoting = parseInt(record.voting) + 1 
                     const updatRecord = await table.update([
                             {
                                id: record.recordID,
                                fields:{
                                    voting : calculateVoting
                              }
                           }
                            ])
                if(updatRecord){
                    const modifiedRecord = getRecord(updatRecord)
                  res.json(modifiedRecord);
                }
              }else
              res.json({message: "Could Not Be Found"})
            }else
            res.json({message: "Id is Missing : ' " })

        }catch(er){
            console.error(er)
        }
    }
}



export default votingCoffeeStoreById;