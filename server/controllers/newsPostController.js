const NewsPost = require("../models/newsPostModel");

exports.createNewsPost = async (req, res) => {
  try {
    const { title, slug, content, author, category, subcategory, subSubcategory, images, tags, featured, status } = req.body;
    const newsPost = new NewsPost({ title, slug, content, author, category, subcategory, subSubcategory, images, tags, featured, status });
    await newsPost.save();
    res.status(201).json({ success: true, message: "News post created!", data: newsPost });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getNewsPosts = async (req, res) => {
  try {
    const newsPosts = await NewsPost.find().populate("category subcategory subSubcategory");
    res.json(newsPosts);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
