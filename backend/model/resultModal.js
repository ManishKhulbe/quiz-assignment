// Importing mongoose
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

var ResultSchema = new Schema({
   
    userId: {
        type: String,
        ref: "User",
        required : true
    },
    points: {
        type: String,
        required : true
    },
    maxPossiblePoints: {
        type: String,
        required : true
    },
    percentage: {
        type: String,
        required : true
    },
    language: {
        type: String,
        required : true
    }
},
{timestamps : true}
);


//Export user module
const Result = mongoose.model("Result", ResultSchema);
 module.exports = Result



