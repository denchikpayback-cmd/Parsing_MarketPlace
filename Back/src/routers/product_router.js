import express from "express"
import ProductController from "../controllers/product_controller.js"
import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()
router.post("/list_products", authMiddleware, ProductController.getProduct)
export default router;