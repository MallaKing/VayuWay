import CorridorsDAO from "./corridorsdao.js"
export default class Routeact{
   
        static async addcorridor(req,res,next){
            try{
                const corid=req.body.corid
                const corridor=req.body.corridor
                const user=req.body.user
                const response=await CorridorsDAO.addcorr(corid,corridor,user)
                res.json({status:"success"})}
                catch(e){
                    res.status(500).json({error:e.message})
                }
            }
            static async getcorridor(req,res,next){
                try{
                let id=req.params.id
                const corridor= await CorridorsDAO.getcorr(id)
                if(!corridor){
                     res.status(404).json({error:"error not found"})
                     return}
                res.json(corridor)}
                catch(e){
                    res.status(500).json({error:e})
                }
            }
            static async updatecorridor(req,res,next){
                try{
                    const corid=req.body.corid
                    const user=req.body.user
                    const newcorr=req.body.corridor
                    const response= await CorridorsDAO.updatecorr(corid,user,newcorr)
                    var {error}=response
                    if (error){
                        res.status(400).json({error})
                    }
                    res.json({status:"success"})}
                    catch(e){
                        res.status(500).json({ error:e.message})
                    }
                }
                static async deletecorridor(req,res,next){
                    try{
                    const id=req.params.id
                    const response=await CorridorsDAO.delcorr(id)
                    res.json({status:"success"})}
                    catch(e){
                        res.status(500).json({error:e.message})
                    }
                   }
                   static async fetchall(req, res, next) {
                    try {
                      const cor = await CorridorsDAO.fa();
                      res.json(cor);
                      return cor;  // ✅ Send response
                    } catch (e) {
                      res.status(500).json({ error: e.toString() });
                    }
                  }
}
    
