import { Router } from "express";
import { createOrderController } from "../controller/orderController";

const router = Router();

router.post("/order", createOrderController);

export default router;