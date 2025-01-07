import { Router } from "express";
import { addProductController, deleteProductController, getProductByIdController, getProductsController, updateProductController } from "../controller/productController";
import { addProductValidator } from "../validators/inputValidator";
import {upload} from "../middlewares/uploadMiddleware";
const router = Router();

router.post("/", upload.single("photo"), addProductValidator, addProductController);
router.get("/", getProductsController);
router.get("/:id", getProductByIdController);
router.put("/:id", upload.single("photo"), updateProductController);
router.delete("/:id", deleteProductController); 
export default router;
