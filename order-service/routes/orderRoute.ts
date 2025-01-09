import { Router } from "express";
import { createOrderController, getOrderByOrderIdController, getOrdersByProductIdController, getOrdersByUserIdController, updateOrderController } from "../controller/orderController";

const router = Router();

router.post("/order", createOrderController);
router.get("/order/product/:productId", getOrdersByProductIdController);
router.get("/order/user/:userId", getOrdersByUserIdController);
router.get("/order/:orderId", getOrderByOrderIdController);
router.put("/order/:orderId", updateOrderController);

export default router;
