import express from "express"
const router = express.Router()


// CHECK IS VALID USER OR NOT
router.get("/isvaliduser", (req, res) => {
    res.send("Hello World")
})

// USER RIGISTER
router.post("/signup ", (req, res) => {
    res.send("Hello World")
})

//  USER LOGIN
router.post("/login ", (req, res) => {
    res.send("Hello World")
})

// USER LOGOUT
router.post("/logout ", (req, res) => {
    res.send("Hello World")
})

// USER PROFILE UPDATE
router.post("/updateprofile ", (req, res) => {
    res.send("Hello World")
})

// USER PASSWORD UPDATE
router.post("/resetpassword ", (req, res) => {
    res.send("Hello World")
})

// USER FORGOT PASSWORD
router.post("/forgotpassword ", (req, res) => {
    res.send("Hello World")
})


export default router