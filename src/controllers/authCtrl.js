import authModel from "../models/authModel.js";
import { signInValidate, signUpValidate } from "../validation/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

class authCtrl {
  async signUp(req, res) {
    try {
      const { username, email, password, role } = req.body;
      //
      const { error } = signUpValidate.validate(req.body);
      if (error) {
        const errors = error.details.map((test) => test.message);
        return res.status(400).json({
          message: errors,
          statusCode:400
        });
      }
      //
      const emailExist = await authModel.findOne({ email });
      if (emailExist) {
        return res.status(400).json({ message: "Email này đã được sử dụng",statusCode:400 });
      }
      //
      const hashedPassword = bcrypt.hashSync(password, 10);
      if (!hashedPassword) {
        throw new Error("Hash mật khẩu thất bại");
      }
      //
      const auth = await authModel.create({
        username,
        email,
        password: hashedPassword,
        role
      });
      res.status(200).json({
        message: "Đăng ký thành công",
        statusCode:200,
        data: { ...auth.toObject(), password: undefined },
      });
    } catch (err) {
      res.status(500).json({ message: "CHÁY SERVER RỒI, " + err.message });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      //
      const { error } = signInValidate.validate(req.body);
      if (error) {
        const errors = error.details.map((test) => test.message);
        return res.status(400).json({
          message: errors,
        });
      }
      //
      const emailExist = await authModel.findOne({ email });
      if (!emailExist) {
        return res.status(400).json({ message: "Email này chưa được đăng ký" , statusCode:400});
      }
      //
      const passwordCheck = await bcrypt.compare(password, emailExist.password);
      if (!passwordCheck) {
        return res.status(400).json({ message: "Sai mật khẩu" , statusCode:400});
      }
      //
      const token = jwt.sign({ id: emailExist._id }, process.env.KEY, {
        expiresIn: "1d",
      });

      res.status(200).json({
        message: "Đăng nhập thành công",
        user: { ...emailExist.toObject(), password: undefined },
        token,
        statusCode:200
      });
    } catch (err) {
      res.status(500).json({
        message: "lỗi server" + err.message,
      });
    }
  }
}

export default authCtrl;
