require("dotenv").config();
const express = require('express');
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const { databaseConnection } = require("./config/db.config");
const authRoutes = require("./routes/auth.route");
const productRoutes = require("./routes/product.route");
const verifyToken = require("./middleware/auth.middleware");
const errorHandler = require("./middleware/error.middleware");


const app = express();

// CONFIGURATIONS
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: "*" }));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));
app.use(morgan("common"));


// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.get("/testAuthMiddleware", verifyToken, (req, res) => res.send("success"));

// error handler
app.use(errorHandler);

// Connection
const port = process.env.PORT || 3170;
const onServerListeningCallback = async () => {
    console.log(`Server is listening at port: ${port}`);
    try {
        await databaseConnection;
        console.log("MongoDB Connected!");
    } catch (err) {
        console.error("Error Connecting to MongoDB");
    }
}

app.listen(port, onServerListeningCallback);