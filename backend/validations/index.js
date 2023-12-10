const BaseJoi = require("joi");

module.exports.joiProductSchema = BaseJoi.object({
    name: BaseJoi.string().required(),
    category: BaseJoi.string().required(),
    price: BaseJoi.number().required().min(0),
    quantity: BaseJoi.number().required().min(0),
    description: BaseJoi.string().required(),
    user: BaseJoi.string().required()
});