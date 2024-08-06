import categoryModel from "../models/CategoryModel.js";

class categoryCtrl {
  async getAllCategories(req, res) {
    try {
      const categories = await categoryModel.find().select('_id name');
      res.status(200).json({
        message: "Lấy tất cả thành công :)",
        data: categories,
      });
    } catch (err) {
      res.status(500).json({
        message: "lỗi " + err.message,
      });
    }
  }
  async getOneCategory(req, res) {
    try {
      const category = await categoryModel.findById(req.params.id);
      res.status(200).json({
        message: "Thêm thành công",
        data: category,
      });
    } catch (err) {
      res.status(500).json({
        message: "lỗi " + err.message,
      });
    }
  }
  async newCategory(req, res) {
    try {
      const category = await categoryModel.create(req.body);
      res.status(200).json({
        message: "Thêm thành công",
        data: category,
      });
    } catch (err) {
      res.status(500).json({
        message: "lỗi " + err.message,
      });
    }
  }
  async updateCategory(req, res) {
    try {
      const category = await categoryModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!category) {
        res.status(404).json({ message: "Not found" });
      }
      res.status(200).json({
        message: "Cập nhật thành công",
        data: category,
      });
    } catch (err) {
      res.status(500).json({
        message: "lỗi " + err.message,
      });
    }
  }
  async deleteCategory(req, res) {
    try {
      const category = await categoryModel.findByIdAndDelete(req.params.id);
      if (!category) {
        res.status(404).json({ message: "Not found" });
      }
      res.status(200).json({
        message: "Xóa thành công",
        data: category,
      });
    } catch (err) {
      res.status(500).json({
        message: "lỗi " + err.message,
      });
    }
  }
}

export default categoryCtrl;
