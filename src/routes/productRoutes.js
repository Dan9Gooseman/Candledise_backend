import express from "express";
import ProductCtrl from "../controllers/productCtrl.js";
import { checkPermission } from "../middleware/checkPermission.js";

const productRouter = express.Router();
const productController = new ProductCtrl();
productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getOneProduct);

productRouter.post("/", checkPermission, productController.newProduct);
productRouter.put("/:id", checkPermission, productController.updateProduct);
productRouter.delete("/:id", checkPermission, productController.deleteProduct);

export default productRouter;
