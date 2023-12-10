const { joiProductSchema } = require(".");
const asyncHandler = require("express-async-handler");

module.exports.validateProduct = asyncHandler((req, res, next) => {
    const { error } = joiProductSchema.validate(req.body);
    console.log({error});
    if (error) {
        res.status(400)
        const msg = error.details.map((el) => el.message).join(",");
        throw new Error(msg);
    } else {
        next();
    }
});