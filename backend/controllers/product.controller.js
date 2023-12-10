const Product = require("../models/product.model");
const asyncHandler = require("express-async-handler");
const { getAllProductsWithFilter, getProductById, updateAProduct, deleteAProductWithId, createAProduct } = require("../services/product.service");

const createProduct = asyncHandler(async (req, res) => {
    console.log({req1: req})
    const data = req.body;
    const newProduct = createAProduct(data);
    await newProduct.save();

    return res.status(201).json({ message: "Created" });
});

const updateProduct = asyncHandler(async (req, res) => {
    const product = await getProductById(req.params.id);
    if (!product) {
        throw new Error("Product does not exist")
    }
    const response = await updateAProduct(req.params.id, req.body);
    res.status(200).json(response);
})

const getProduct = asyncHandler(async (req, res) => {
    const response = await getProductById(req.params.id);
    return res.status(200).json(response);
})

const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const response = await deleteAProductWithId(id);
    return res.status(200).json({ message: "Deleted" });
});

const getAllProducts = asyncHandler(async (req, res) => {
    const response = await getAllProductsWithFilter(req.body || {})
    return res.status(200).json(response);
});

module.exports = {
    createProduct,
    updateProduct,
    getAllProducts,
    getProduct,
    deleteProduct
}