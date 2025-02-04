import { Router } from "express";
import * as productController from "../controllers/ProductController";
import { authMiddleware } from "../middlewares/AuthMidleware";
 
const router = Router();

// add new product
router.post("/new", productController.addP);

// get all product
router.get("/", authMiddleware, productController.getAll);

// get user by id
router.get("/byid/:id", authMiddleware, productController.getP);
 
// update user
router.patch("/:id", authMiddleware, productController.updateP);
 
// delete user
router.delete("/:id", authMiddleware, productController.deleteP);

export default router;