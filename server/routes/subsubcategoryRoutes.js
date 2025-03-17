const express = require("express");
const router = express.Router();
const subSubcategoryController = require("../controllers/subsubcategoryController");

router.post("/", subSubcategoryController.createSubSubcategory);  
router.get("/", subSubcategoryController.getSubSubcategories);    

module.exports = router;
