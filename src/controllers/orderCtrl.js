import Order from "../models/orderModel.js";

class orderCtrl {
  // GET /orders
  async getAllOrders(req, res, next) {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
  // GET /orders/:id
  async getOrderDetail(req, res, next) {
    try {
      const order = await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({message:"404 not found"})
      }
      res.status(StatusCodes.OK).json(order);
    } catch (error) {
      next(error);
    }
  }
  // POST /orders
  async createOrder(req, res, next) {
    try {
      const newOrder = await Order.create(req.body);
      const cart = await Cart.findOneAndDelete({ user: req.body.user });
      if (!cart) {
        return res.status(404).json({message:"404 not found"})
      }
      res.status(StatusCodes.CREATED).json({
        message: "Create Order Successfull",
        data: newOrder,
      });
    } catch (error) {
      next(error);
    }
  }
  // PUT /orders/:id
  async updateOrder(req, res, next) {
    try {
      const updateOrder = await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updateOrder) {
        return res.status(404).json({message:"404 not found"})
      }

      res.status(StatusCodes.OK).json({
        message: "Update Order Successfull",
        data: updateOrder,
      });
    } catch (error) {
      next(error);
    }
  }
  // DELETE /orders/:id
  async deleteOrder(req, res, next) {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).json({message:"404 not found"})
      }
      res.status(StatusCodes.OK).json({
        message: "Delete Order Done",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default orderCtrl;
