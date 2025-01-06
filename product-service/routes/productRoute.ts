import { Router } from "express";
import { addProductController, deleteProductController, getProductByIdController, getProductsController, updateProductController } from "../controller/productController";
import { addProductValidator } from "../validators/inputValidator";

const router = Router();

router.post("/", addProductValidator, addProductController);
router.get("/", getProductsController);
router.get("/:id", getProductByIdController);
router.put("/:id", updateProductController);
router.delete("/:id", deleteProductController); 
export default router;
