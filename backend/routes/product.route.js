const express = require('express');
const { getAllProducts, createProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { validateProduct } = require('../validations/product.validate');
const verifyToken = require('../middleware/auth.middleware');

const router = express.Router();

router.get("/", verifyToken, getAllProducts);
router.post("/", verifyToken, validateProduct, createProduct);
router.get("/:id", getProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);


module.exports = router;