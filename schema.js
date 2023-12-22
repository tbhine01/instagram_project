const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    username:{
        required: true,
        type: String 
    },
    content:{
        required: true,
        type: String
    }, 
    timestamp:{
        required: true,
        type: Date,
        default: Date.now
    }
})

const postsSchema = new mongoose.Schema({
    userid:{
        required: true,
        type: String
    },
    username:{
        required: true,
        type: String
    },
    image:{
        required: true,
        type: String
    },
    caption:{
        required: false,
        type: String
    }, 
    likes: {
        required: false,
        type: [String]
    },
    comments: {
        require: false,
        type: [commentSchema]
    },
    timestamp: {
        require: true,
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Posts', postsSchema)