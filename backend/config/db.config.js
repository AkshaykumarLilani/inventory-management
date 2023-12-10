const { connect } = require("mongoose");

const mongooseUrl = process.env.MONGO_URL;

const databaseConnection = connect(mongooseUrl);

module.exports = databaseConnection;