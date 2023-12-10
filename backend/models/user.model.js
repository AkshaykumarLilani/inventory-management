const { Schema, model } = require('mongoose');
const bcryptjs = require("bcryptjs");

const userSchema = Schema({
    firstName: {
        type: String,
        required: [true, "Please add your first name"],
        min: 2,
        max: 50,
    },
    lastName: {
        type: String,
        required: [true, "Please add your last name"],
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: [true, "Please add your email"],
        max: 50,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
    photo: {
        type: String,
        required: [true, "Please add a photo."],
        default: "https://i.ibb.co/4pDNDk1/avatar.png"
    },
    bio: {
        type: String,
        maxLength: [240, "Bio must not exceed 240 characters length limit."]
    }
}, { timestamps: true });

// hash the password before saving
userSchema.pre("save", async function (next) {

    // if password field is not modified, return and proceed
    if (!this.isModified("password")){
        return next();
    }

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(this.password, salt);
    this.password = hashedPassword;
    next();
});

const User = model("user", userSchema);

module.exports = User;