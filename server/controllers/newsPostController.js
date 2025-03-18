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

exports.getNewsPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const newsPost = await NewsPost.findById(id).populate("category subcategory subSubcategory");

    if (!newsPost) {
      return res.status(404).json({ success: false, message: "News post not found!" });
    }

    res.json({ success: true, data: newsPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
