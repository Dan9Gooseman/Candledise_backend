import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";

const checkPermission = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "kkhông có token, hãy đăng nhập",
      });
    }
    //decode
    const data = jwt.verify(token, process.env.KEY);
    const user = await authModel.findById(data.id);
    if (!user) {
      return res.status(404).json({ message: "tài khoản không tồn tại" });
    }
    //
    if (user.role !== "admin") {
      return res.status(403).json({ message: "không có quyền truy cập" });
    } 
    res.locals.id = user._id;
    next();
  } catch (err) {
    console.log(err);
  }
};
export { checkPermission };
