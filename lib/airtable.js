const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_KEY);
const table = base('Table 1');


const getMinifiedRecord = (record) =>{
    return{
        recordID : record.id,
        ...record.fields
    }
}

const getRecord = (records) =>{
  return  records.map(record => getMinifiedRecord(record))}



  export {table, getRecord};