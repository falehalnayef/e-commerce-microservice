import { Router } from "express";
import { addProductController } from "../controller/productController";
import { addProductValidator } from "../validators/inputValidator";

const router = Router();

router.post("/", addProductValidator, addProductController);

export default router;