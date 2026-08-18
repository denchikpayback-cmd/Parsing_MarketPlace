import { Router } from "express";
import userController from "../controllers/user_controller.js";
import registerValidation from '../validation/auth.js'
import { authMiddleware } from "../middleware/auth.js";
const router = Router();

router.post('/authorization', registerValidation, userController.registerUser);
router.post('/login', userController.loginUser)
router.post('/logout', authMiddleware, userController.logout)
router.get("/aboutme", authMiddleware, userController.aboutMe)
export default router;