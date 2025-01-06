import { Router } from "express";
import { addProductController, getProductByIdController, getProductsController, updateProductController } from "../controller/productController";
import { addProductValidator } from "../validators/inputValidator";

const router = Router();

router.post("/", addProductValidator, addProductController);
router.get("/", getProductsController);
router.get("/:id", getProductByIdController);
router.put("/:id", updateProductController);
export default router;
