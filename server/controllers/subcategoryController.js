const Subcategory = require("../models/subcategoryModel");
const Category = require("../models/categoryModel");

exports.createSubcategory = async (req, res) => {
  try {
    const { name, slug, category } = req.body;
    
    const subcategory = new Subcategory({ name, slug, category });
    await subcategory.save();

    await Category.findByIdAndUpdate(category, { $push: { subcategories: subcategory._id } });

    res.status(201).json(subcategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate("subSubcategories");
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
