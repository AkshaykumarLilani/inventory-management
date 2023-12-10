//This Seeds folder is a way to populate our database with some data wo that we have something to work with,

const mongoose = require("mongoose");
const productModel = require("../models/product.model");
const { generateRandomProductName } = require("./seedHelpers");
const { generateRandomPrice } = require("./seedHelpers");
const { generateRandomQuantity } = require("./seedHelpers");
const { generateRandomCategory } = require("./seedHelpers");
const { generateRandomDescription } = require("./seedHelpers");

mongoose.connect("mongodb+srv://akshaylilani60:3Wv9XZuPB3mz900n@socialmedia-cw.sikhqmh.mongodb.net/inventory-management");
mongoose.connection.on(
    "error",
    console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", () => {
    console.log("Database Connected");
});

const seedDb = async () => {
    await productModel.deleteMany({});
    for (let i = 0; i < 500; i++) {
        const product = new productModel({
            user: "656c262e68e0104266bcb72b",
            name:generateRandomProductName(),
            price: generateRandomPrice(10,1000),
            quantity: generateRandomQuantity(),
            category: generateRandomCategory(),
            description: generateRandomDescription()
        });
        await product.save();
    }
};
seedDb().then(() => {
    mongoose.connection.close();
    console.log("Connection closed");
});