const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name cannot be empty"]
    },
    category: {
        type: [String],
        enums: ["Electronics", "Apparels"],
        required: [true, "Category cannot be empty"]
    },
    price: {
        type: Number,
        required: [true, "Price cannot be empty"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity cannot be empty"],
        default: 0,
        min: [0, "Quantity cannot be less than 0"]
    },
    description: {
        type: String,
        required: [true, "Description cannot be empty"],
    },
    photo: {
        type: String,
        // required: [true, "Please add an image for the product"]
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    }
}, {timestamps: true});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;