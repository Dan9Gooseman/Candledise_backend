import express from "express";
import categoryCtrl from "../controllers/categoryCtrl.js";

const categoryRouter = express.Router();
const categoryController = new categoryCtrl();
categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getOneCategory);
categoryRouter.post("/", categoryController.newCategory);
categoryRouter.put("/:id", categoryController.updateCategory);
categoryRouter.delete("/:id", categoryController.deleteCategory);

export default categoryRouter;
