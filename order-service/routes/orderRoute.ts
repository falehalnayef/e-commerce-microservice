import { Router } from "express";
import { createOrderController, deleteOrderController, getOrderByOrderIdController, getOrdersByProductIdController, getOrdersByUserIdController, updateOrderController } from "../controller/orderController";

const router = Router();

router.post("/order", createOrderController);
router.get("/order/product/:productId", getOrdersByProductIdController);
router.get("/order/user/:userId", getOrdersByUserIdController);
router.get("/order/:orderId", getOrderByOrderIdController);
router.put("/order/:orderId", updateOrderController);
router.delete("/order/:orderId", deleteOrderController);
export default router;
