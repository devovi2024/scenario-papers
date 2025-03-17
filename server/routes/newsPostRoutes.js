const express = require("express");
const router = express.Router();
const { createNewsPost, getNewsPosts } = require("../controllers/newsPostController");

router.post("/", createNewsPost);
router.get("/", getNewsPosts);

module.exports = router;
