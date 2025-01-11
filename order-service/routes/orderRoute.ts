import { Router } from "express";
import { createOrderController, deleteOrderController, getOrderByOrderIdController, getOrdersByProductIdController, getOrdersByUserIdController, updateOrderController } from "../controller/orderController";

const router = Router();

router.post("/", createOrderController);
router.get("/product/:productId", getOrdersByProductIdController);
router.get("/user/:userId", getOrdersByUserIdController);
router.get("/:orderId", getOrderByOrderIdController);
router.put("/:orderId", updateOrderController);
router.delete("/:orderId", deleteOrderController);
export default router;
