import { Router } from "express";
import userRoutes from "./UserRoutes";
import productRoutes from "./ProductRoutes";

/* további példák:
import productRoutes from "./product.routes";
import orderRoutes from "./order.routes";
import customerRoutes from "./customer.routes";
*/
 
const router = Router();
 
// regisztráljuk az útvonalakat
router.use("/users", userRoutes);
router.use("/products", productRoutes)

/* további példák:
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/customers", customerRoutes);
*/
 
export default router;