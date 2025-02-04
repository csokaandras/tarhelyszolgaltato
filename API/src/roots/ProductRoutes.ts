import { Router } from "express";
import * as productController from "../controllers/ProductController";
import { authMiddleware } from "../middlewares/AuthMidleware";
 
const router = Router();



// get all product
router.get("/", authMiddleware, productController.getAllProduct);




export default router;