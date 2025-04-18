import mongodb from"mongodb"
import {con} from "./index.js"
const ObjectId=mongodb.ObjectId
let corridors
export default class CorridorsDAO{
  static async injectDB(conn){
    if(corridors)
        return
    try{
        corridors=await conn.db("Corridors").collection("Corridors1")
        return corridors;
        
    }
    catch(e){
        console.error(`unable to establish collection handles in DAO :${e}`)

    }
  }
  static async addcorr(corid,corridor,user){
  try{
    const corridordoc={
        corid:corid,
        user:user,
        corridor:corridor,
    }
    console.log("adding")
    return await corridors.insertOne(corridordoc)
  }
  catch(e){
    console.error(`unable to post corridor:${e}`)
  }
 return {error:e}}
  static async getcorr(corid){
    try{
        return await corridors.findOne({corid: parseInt(corid)})
    }
    catch(e){
        console.error(`unable to get corridor:${e}`)
        return {error:e}
    }
  }
  static async updatecorr(corid,user,newcorr){
    try{
        const updateresponse=await corridors.updateOne({corid: parseInt(corid)},
    {$set:{user:user,corridor:newcorr}})
    return updateresponse
    }
    catch(e){
        console.log(`unable to update corridor${e}`)
        return {error:e}
    }
  }
  static async delcorr(id){
    try{
      const delresponse=await corridors.deleteOne({_id: new ObjectId(id)})
      return delresponse
    }
    catch(e){
      console.error(`unable to delete corridor:${e}`)
      return{error:e}
    }
  }
  static async fa(){
    try{
      const allCorridors = await corridors.find({}).toArray();
      return allCorridors;
    }
    catch(e){
      console.error(`unable to get corridor:${e}`)
      return {error:e}
  }
  }
}