import { Router } from "express";
import { createOrderController, getOrdersByProductIdController, getOrdersByUserIdController } from "../controller/orderController";

const router = Router();

router.post("/order", createOrderController);
router.get("/order/product/:productId", getOrdersByProductIdController);
router.get("/order/user/:userId", getOrdersByUserIdController);

export default router;