import { Router } from "express";
import userController from "../controllers/user_controller.js";
import registerValidation from '../validation/auth.js'
const router = Router();

router.post('/authorization', registerValidation, userController.registerUser);
router.post('/login', userController.loginUser)

export default router;