const mongoose = require("mongoose");

const subSubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory", required: true },
  createdAt: { type: Date, default: Date.now },
});

subSubcategorySchema.pre("save", async function (next) {
  const Subcategory = mongoose.model("Subcategory");
  const exists = await Subcategory.findById(this.subcategory);
  if (!exists) {
    const err = new Error("Invalid subcategory ID");
    next(err);
  } else {
    next();
  }
});

module.exports = mongoose.model("SubSubcategory", subSubcategorySchema);
