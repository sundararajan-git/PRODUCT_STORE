
import Product from "./models/Product"

// GET ALL PROUCTS
export const getProducts = async (req, res) => {
    try{
        const products = await Product.find()
        res.status(200).json({success:true,data:products})
    }catch(err){
        console.error(err.messages)
            res.status(404).json({suces:false,message:err.messages})
        
    }
};

// GET SINGLE PRODUCT 
export const getProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json({success:true,data:product})
    }catch(err){
        console.error(err)
        res.status(400).json({suces:false,message:err.messages})
    }

}

// ADD PRODUCT 
export const addProduct = async (req,res)=>{
    try{
        console.log(req.body)

        const {name,price,description,image} = req.body

        if(!name || !price || !description || !image){
            return res.status(400).json({success:false,message:"All fields are required"})
        }

        const product = await Product.create(req.body)

        res.status(200).json({success:true,data:product})

    }catch(err){
        console.error(err)
        res.status(400).json({suces:false,message:err.messages})
    }
}


// UPDATE  PRODUCT 
export  const updateProduct = async (req,res)=>{
    try{
        console.log(req.body)

        const {name,price,description,image} = req.body

        const {_id} = req.params

        if(!_id){
            return res.status(400).json({success:false,message:"All fields are required"})
        }

        if(!name || !price || !description || !image){
            return res.status(400).json({success:false,message:"All fields are required"})
        }

        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({success:true,data:product})
    }catch(err){
        console.error(err)
        res.status(400).json({suces:false,message:err.messages})
    }
}

// DELETE PRODUCT 
export const deleteProduct = async (req,res)=>{
    try{
        const {_id} = req.params

        if(!_id){
            return res.status(400).json({success:false,message:"All fields are required"})
        }

        const product = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({success:true,data:product})
    }catch(err){
        console.error(err)
        res.status(400).json({suces:false,message:err.messages})
    }
}

