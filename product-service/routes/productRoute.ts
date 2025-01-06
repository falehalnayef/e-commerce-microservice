import { Router } from "express";
import { addProductController, getProductByIdController, getProductsController } from "../controller/productController";
import { addProductValidator } from "../validators/inputValidator";

const router = Router();

router.post("/", addProductValidator, addProductController);
router.get("/", getProductsController);
router.get("/:id", getProductByIdController);
export default router;
