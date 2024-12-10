import { connect } from "mongoose"


// DB CONNECT FUNCTION
export const connectDB = async () => {
    try{
        console .log(process.env.MONGO_URI)
      const conn = await connect(process.env.MONGO_URI)
console.log(`MongoDB Connected: ${conn.connection.host}`)
    }catch(err){
        console .error(err)
    }
}