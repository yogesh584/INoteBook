const mongoose = require("mongoose");

const UserSchema = new Schema({
    name: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required : true,
        unique: true
    },
    password: {
        type: String,
        required : true
    },
    date: {
        type: Date,
        default: Data.now
    }
});

const UserModel = mongoose.Model('user',UserSchema);
module.exports = UserModel;