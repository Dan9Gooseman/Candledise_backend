import mongoose from "mongoose";

const Schema = mongoose.Schema;
const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "authModel",
      required:true
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "productModel",
        },
        quantity: { type: Number},
        currentPrice: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const cartModel = mongoose.model("cart", cartSchema);

export default cartModel;
