import Joi from "joi";

export const productValidate = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Buộc phải nhập tiêu đề sản phẩm"
  }),
  rate: Joi.number().min(1).max(5),
  description: Joi.string().required().messages({
    "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
    "any.required": "Phải nhập mô tả sản phẩm",
  }),
  category: Joi.string().required().messages({
    "any.required": "Phải nhập loại sản phẩm",
  }),
  scent: Joi.string().required(),
  price: Joi.number().required().min(0),
  stock: Joi.number().required().min(0),
  thumbnail: Joi.string().required(),
  active: Joi.boolean().required()
}).options({
  abortEarly: false,
});
