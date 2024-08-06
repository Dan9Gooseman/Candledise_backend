import joi from "joi";

export const signUpValidate = joi.object({
  username: joi.string().min(3).max(30).required().messages({
    "any.required": "Buộc phải nhập username",
    "string.min": "Username phải có nhiều hơn 3 ký tự",
    "string.max": "Username phải có ít hơn 30 ký tự",
  }),
  email: joi.string().email().required().messages({
    "string.email": "Không đúng định dạng email",
    "any.required": "Email không được bỏ trống",
  }),
  password: joi.string().min(6).required().messages({
    "string.min": "Mật khẩu phải có ít nhất 6 ký tự",
    "any.required": "Mật khẩu không được bỏ trống",
  }),
  confirmpassword: joi.string().required()
}).options({
  abortEarly: false,
});

export const signInValidate = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Hãy nhập đúng định dạng email",
    "string.required": "Email không được để trống",
  }),
  password: joi.string().required().messages({
    "string.required": "Mật khẩu không được để trống",
  }),
}).options({
  abortEarly: false,
});

