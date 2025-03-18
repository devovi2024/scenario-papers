const express = require("express");
const router = express.Router();
const { createNewsPost, getNewsPosts, getNewsPostById } = require("../controllers/newsPostController");

router.post("/", createNewsPost);
router.get("/", getNewsPosts);
router.get("/:id", getNewsPostById); 

module.exports = router;
