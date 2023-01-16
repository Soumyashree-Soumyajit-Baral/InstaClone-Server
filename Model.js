const mongoose = require("mongoose")

const Postschema = new mongoose.Schema({
    Author : String,
    Location : String,
    image : String,
    likes:Number,
    date : String,
    Description : String,
})

const PostModel =  mongoose.model("Posts",Postschema)
module.exports = PostModel;
