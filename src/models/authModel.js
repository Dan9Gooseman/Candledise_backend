import mongoose from "mongoose";

const Schema = mongoose.Schema;
const authSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, min: 6, max: 20 },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
});

const authModel = mongoose.model("authModel", authSchema);
export default authModel;
