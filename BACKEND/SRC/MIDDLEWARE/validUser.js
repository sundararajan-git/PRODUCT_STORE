import jwt from "jsonwebtoken"


export const isValidUser = async (req,res)=>{
    try{

        const token = req.cookie("token")
        
     
    }catch(err){
        console.error(err)
        res.status(400).json({success:false ,message : err.message})
    }
}