import express from "express";
import orderCtrl from "../controllers/orderCtrl.js";

const orderRouter = express.Router();
const orderController = new orderCtrl();
orderRouter.get("/", orderController.getAllOrders);
orderRouter.get("/:id", orderController.getOrderDetail);
orderRouter.post("/", orderController.createOrder);
orderRouter.put("/:id", orderController.updateOrder);
orderRouter.delete("/:id", orderController.deleteOrder);

export default orderRouter;
