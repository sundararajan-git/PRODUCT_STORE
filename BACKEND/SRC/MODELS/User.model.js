
import {Schema} from "moongoose"

// USER SCHEMA
const userSchema = new  Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
isVerfied: {
    type: Boolean,
    default: false
},
verificationToken:{
    type:String,
}, 
verifactionExpireAt:{
    type : Date,
},
resetToken:{
    type:String,
}, 
resetTokenExpireAt:{
    type : Date,
}
,
lastLogin:{
    type: Date,
    default: Date.now,
},
lastLogout:{
    type: Date,
    default: Date.now,
},

},
{
    timestamps: true,
})

const User = model("User", userSchema)

export default User