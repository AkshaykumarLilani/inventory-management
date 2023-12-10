const Product = require("../models/product.model");

const getProductById = (id) => {
    return Product.findOne({ _id: id });
}

const getAllProductsWithFilter = (filter = {}) => {
    return Product.find(filter).sort({updatedAt: -1});
}

const deleteAProductWithId = (id) => {
    return Product.findOneAndDelete({_id: id});
}

const updateAProduct = (id, data) => {
    return Product.findOneAndUpdate({_id: id}, data);
}

const createAProduct = (validatedProduct) => {
    return new Product(validatedProduct);
}

module.exports = {
    getProductById,
    getAllProductsWithFilter,
    deleteAProductWithId,
    updateAProduct,
    createAProduct
}