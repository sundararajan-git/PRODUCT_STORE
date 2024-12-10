import User from "../models/UserModel";
import bcrypt from "bcrypt";

// USER SIGNUP
export const signUp = async(req,res)=>{
    try{

        const {name,email,password } = req.body

        if(!name || !email || !password){
            return res.status(400).send("All fields are required")
        }

        // Check if user already exists
        let user = await User.findOne({email})
        if(user){
            return res.status(400).send("User already exists")
        }

        const hashedPassword = await bcrypt.hash(password,10)

        // Create new user
        user = new User({
            name,
            email,
            password: hashedPassword,
        })

        // Save user to database
        await user.save()

    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}