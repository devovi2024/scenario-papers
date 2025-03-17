const mongoose = require("mongoose");

const newsPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategory" },
  subSubcategory: { type: mongoose.Schema.Types.ObjectId, ref: "SubSubcategory" },
  images: [{ type: String }],
  tags: [{ type: String }],
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: [
    {
      user: { type: String, required: true },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  featured: { type: Boolean, default: false },
  publishedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["draft", "published", "archived"], default: "draft" },
});

module.exports = mongoose.model("NewsPost", newsPostSchema);
