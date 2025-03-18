const SubSubcategory = require("../models/subSubcategoryModel");
const Subcategory = require("../models/subcategoryModel");

exports.createSubSubcategory = async (req, res) => {
  try {
    const { name, slug, subcategory } = req.body;

    if (!name || !slug || !subcategory) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const subSubcategory = new SubSubcategory({ name, slug, subcategory });
    await subSubcategory.save();

    await Subcategory.findByIdAndUpdate(subcategory, { $push: { subSubcategories: subSubcategory._id } });

    res.status(201).json(subSubcategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSubSubcategories = async (req, res) => {
  try {
    const subSubcategories = await SubSubcategory.find().populate("subcategory");
    res.json(subSubcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
