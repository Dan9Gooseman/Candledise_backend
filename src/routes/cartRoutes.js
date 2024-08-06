import express from "express";
import cartCtrl from "../controllers/cartCtrl.js";

const cartRouter = express.Router();
const cartController = new cartCtrl();
cartRouter.get("/", cartController.getAllCarts);
cartRouter.get("/:id", cartController.getCartDetail);
cartRouter.get("/user/:id", cartController.getCartOfUser);
cartRouter.post("/", cartController.createCart);
cartRouter.put("/:id", cartController.updateCart);
cartRouter.delete("/:id", cartController.deleteCart);
cartRouter.delete("/user/:userId/product/:id",cartController.deleteProductCart);

export default cartRouter