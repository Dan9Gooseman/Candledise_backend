import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";

class cartCtrl {
  // GET /carts
  async getAllCarts(req, res, next) {
    try {
      const carts = await cartModel.find().populate({
        path: "products",
        populate: {
          path: "product",
          model: productModel,
        },
      });
      res.status(200).json(carts);
    } catch (error) {
      next(error);
    }
  }
  // GET /carts/:id
  async getCartDetail(req, res, next) {
    try {
      const cart = await cartModel.findById(req.params.id);

      if (!cart) {
        return res.status(404).json({ message: "Cart Not Found" });
      }
      res.status(202).json(cart);
    } catch (error) {
      next(error);
    }
  }
  // GET /carts/user/:id
  async getCartOfUser(req, res, next) {
    try {
      const cartID = await cartModel
        .findOne({ user: req.params.id })
        .select("_id");
      // .populate(
      // {
      // path: "products",
      // populate: {
      //   path: "product",
      //   model: productModel,
      //   },
      // }
      // );
      if (!cartID) {
        return res.status(404).json({ message: "Cart Not Found" });
      }
      res.status(200).json(cartID);
    } catch (error) {
      next(error);
    }
  }
  // POST /carts
  async createCart(req, res, next) {
    try {
      const { quantity, user, product } = req.body;
      const cart = await cartModel.findOne({ user });
      if (cart) {
        return res
          .status(404)
          .json({
            message: "Cart Existed, You can only Update Cart",
            cartID: cart._id,
          });
      }
      const newCart = await cartModel.create({
        user,
        products: [],
      });
      res.status(200).json({
        message: "Create Cart Successfull",
        data: newCart,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCart(req, res, next) {
    try {
      const { userID, products } = req.body;
      const cart = await cartModel.findOne({ user: userID });

      if (!cart) {
        return res.status(404).json({ message: "Cart Not Found" });
      }
      let newProductCart = [...cart.products];

      products.forEach((productItem) => {
        const { product, quantity } = productItem;
        const productExisted = newProductCart.find((item) =>
          item.product.equals(product)
        );

        if (productExisted) {
          newProductCart = newProductCart.map((item) =>
            item.product.equals(product)
              ? { product: item.product, quantity: item.quantity + quantity }
              : item
          );
        } else {
          newProductCart.push({ product, quantity });
        }
      });

      const updatedCart = await cartModel.findByIdAndUpdate(
        req.params.id,
        { products: newProductCart },
        {
          new: true,
        }
      );

      if (!updatedCart) {
        return res.status(404).json({ message: "Cart Not Found" });
      }

      res.status(200).json({
        message: "Update Cart Successful",
        data: updatedCart,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProductCart(req, res, next) {
    try {
      const { userId, id } = req.params;
      const cart = await cartModel.findOne({ user: userId });
      if (!cart) {
        return res.status(404).json({ message: "Cart Not Found" });
      }

      const newProductCart = cart.products.filter((item) => item.product != id);

      const updateCart = await cartModel.findByIdAndUpdate(
        cart._id,
        { products: newProductCart },
        {
          new: true,
        }
      );
      if (!updateCart) {
        return res.status(404).json({ message: "Cart Not Found" });
      }
      res.status(200).json({
        message: "Delete Product Cart Successfull",
        data: updateCart,
      });
    } catch (error) {
      next(error);
    }
  }
  // DELETE /carts/:id
  async deleteCart(req, res, next) {
    try {
      const cart = await cartModel.findByIdAndDelete(req.params.id);
      if (!cart) {
        return res.status(404).json({ message: "Cart Not Found" });
      }
      res.status(200).json({
        message: "Delete Cart Done",
      });
    } catch (error) {
      next(error);
    }
  }
}
export default cartCtrl;
