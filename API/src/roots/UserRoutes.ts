import { Router } from "express";
import * as userController from "../controllers/UserController";
import { authMiddleware } from "../middlewares/AuthMidleware";
 
const router = Router();
 
/**
* USER modul útvonalai
*/
 
// register new user
router.post("/register", userController.register);
 
// login user
router.post("/login", userController.login);
 
// get all users
router.get("/", authMiddleware, userController.getAllUsers);
 
// get user by id
router.get("/byid/:id", authMiddleware, userController.getUserById);
 
// get logged user profile
router.get("/profile", authMiddleware, userController.getLoggedUserProfile);
 
// update user
router.patch("/:id", authMiddleware, userController.updateUser);
 
// delete user
router.delete("/:id", authMiddleware, userController.deleteUser);
 
export default router;