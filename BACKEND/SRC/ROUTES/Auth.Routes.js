import express from "express"
const router = express.Router()
import { signUp, login, logout, forgotPassword, resetPassword, updateProfile } from "../CONTROLLERS/User.Controller.js"


// CHECK IS VALID USER OR NOT
router.get("/isvaliduser", (req, res) => {
    res.send("yes")
})

// USER RIGISTER
router.post("/signup ", signUp)

//  USER LOGIN
router.post("/login ", login)

// USER LOGOUT
router.post("/logout ", logout)

// USER PROFILE UPDATE
router.post("/updateprofile ", updateProfile)

// USER PASSWORD UPDATE
router.post("/resetpassword ", resetPassword)

// USER FORGOT PASSWORD
router.post("/forgotpassword ", forgotPassword)


export default router