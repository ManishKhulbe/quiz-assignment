// Importing mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var UserSchema = new Schema({
   
    email: {
        type: String,
        index: true,
        unique: true
    },
    password: {
        type: String
    },
    gender: {
        type: Number,
        default: 0, //0 Undefined, 1 Male, 2 Female, 3 Others
        min :0,
        max:3
    },
    UserName : {
        type: String,
        default: ''
    },
    profileImage: {
        type: String,
        default: ''
    },
    isAdmin: {
        type: Number,
        default: 0
    }
},
{timestamps : true}
);


//Export user module
const User = mongoose.model("User", UserSchema);
 module.exports = User


