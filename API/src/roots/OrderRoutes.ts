import { Router } from "express";
import { authMiddleware } from "../middlewares/AuthMidleware";
import { deleteH, getAll, getH, newHosting } from "../controllers/OrderController";
 
const router = Router();
 
/**
* USER modul útvonalai
*/
 
// register new user
router.post("/", newHosting);

// get all users
router.get("/", authMiddleware, getAll);
 
// get user by id
router.get("/byid/:id", authMiddleware, getH);

// delete user
router.delete("/:id", authMiddleware, deleteH);
 
export default router;