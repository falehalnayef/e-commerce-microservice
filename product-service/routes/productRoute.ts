import { Router } from "express";
import { addProductController, getProductsController } from "../controller/productController";
import { addProductValidator } from "../validators/inputValidator";

const router = Router();

router.post("/", addProductValidator, addProductController);
router.get("/", getProductsController);
export default router;