const SubSubcategory = require("../models/subSubcategoryModel");
const Subcategory = require("../models/subcategoryModel"); 

exports.createSubSubcategory = async (req, res) => {
  try {
    console.log("Received Request Body:", req.body); 

    const { name, slug, subcategory } = req.body;

    if (!name || !slug || !subcategory) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const subcategoryExists = await Subcategory.findById(subcategory);
    if (!subcategoryExists) {
      return res.status(400).json({ error: "Invalid subcategory ID" });
    }

    const subSubcategory = new SubSubcategory({ name, slug, subcategory });
    await subSubcategory.save();

    res.status(201).json(subSubcategory);
  } catch (error) {
    console.error("Error saving subsubcategory:", error);
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
