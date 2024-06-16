import { Router } from "express";
import { userController } from "../controller/user.controller.js"


const router = Router()

router.post('/login', userController.login)

export default router; 