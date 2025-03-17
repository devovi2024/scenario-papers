const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  subSubcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubSubcategory" }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Subcategory", subcategorySchema);
