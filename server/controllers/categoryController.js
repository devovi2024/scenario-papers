const Category = require("../models/categoryModel");

exports.createCategory = async (req, res) => {
  try {
    const { name, slug, description } = req.body;
    const category = new Category({ name, slug, description });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate({
      path: "subcategories",
      populate: { path: "subSubcategories" }, // ✅ সাব-সাবক্যাটাগরি অন্তর্ভুক্ত
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
