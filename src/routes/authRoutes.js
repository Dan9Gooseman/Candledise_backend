import express from "express"
import authCtrl from "../controllers/authCtrl.js"

const authRouter = express.Router()
const authController = new authCtrl
authRouter.post('/signup', authController.signUp)
authRouter.post('/signin', authController.signIn)

export default authRouter