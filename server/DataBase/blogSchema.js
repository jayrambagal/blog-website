const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    id:Number,
    title:String,
    content:String,
    created_at: {
        type: Date,
        default: Date.now
      }
},)

module.exports = mongoose.model('blog',blogSchema)