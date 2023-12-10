const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { getNewUser, getUserByEmail } = require("../services/user.service");

const generateJWTToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

const signUpUser = asyncHandler(async (req, res) => {
    const body = req.body;
    const newUser = getNewUser(body);
    await newUser.save();

    // generate a token to login them in directly
    const token = generateJWTToken(newUser.id);

    const userToSend = newUser.toObject();
    delete userToSend.password;

    const response = { token, user: userToSend };

    return res.status(201).json(response);
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user) {
        res.status(400);
        throw new Error("User does not exist.")
    }

    const isMatch = bcryptjs.compareSync(password, user.password);
    if (!isMatch) {
        res.status(400);
        throw new Error("Invalid credentials.");
    }

    // generate a token to login them in directly
    const token = generateJWTToken(user.id);

    const userToSend = user.toObject();
    delete userToSend.password;

    return res.status(200).json({ token, user: userToSend });
});

const logoutUser = asyncHandler(async(req, res) => {

});

module.exports = {
    signUpUser,
    loginUser,
    logoutUser
}