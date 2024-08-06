import mongoose from "mongoose";

const Schema = mongoose.Schema;
const productSchema = new Schema({
  title: { type: String, required: true },
  rate: { type: Number, min: 1, max: 5 },
  description: { type: String, required: true },
  scent:{type:String, required:true},
  price: { type: Number, required: true,min:0 },
  stock: {type:Number, required:true, min:0},
  active: { type: Boolean, default: true },
  thumbnail: {type:String, required:true},
  category: {
    type: Schema.Types.ObjectId,
    ref: "categoryModel",
    require: true,
  },
});
const productModel = mongoose.model("product", productSchema);

export default productModel;
