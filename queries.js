const Model = require("./schema.js")

async function createPost(req, res) {
    const post = new Model({
        userid: req.body.userid,
        username: req.body.username,
        image: req.body.image,
        caption: req.body.caption,
        timestamp: req.body.timestamp
    })

    if(req.body.caption) {
        post.caption = req.body.caption
    }

    const savePost = await post.save()
    res.status(200).json(savePost)
}

async function getPosts(req, res) {
    const posts = await Model.find()
    res.status(200).json(posts)
}


async function getPostById(req, res) {
    const id = req.params.id

    const post = await Model.findById(id)
    res.status(200).json(post)
}

async function updatePost(req, res) {
    const id = req.params.id
    const newData = req.body
    const options = {new: true}

    const post = await Model.findByIdAndUpdate(id, newData, options)

    res.status(200).json(post)
}

async function deletePost(req, res) {
    const id = req.body.id

    const data = await Model.findByIdAndDelete(id)
    res.status(200).send(`Post ${id} was deleted`)
}

// Comments

async function addComment(req, res) {
    const postId = req.params.id
    const commentUsername = req.body.username
    const commentContent = req.body.content

    const post = await Model.findById(postId)

    const comment = {
        username: commentUsername,
        content: commentContent,
        // timestamp: timestamp
    }

    post.comments.push(comment)
    const data = await post.save()
    res.status(200).json(data)
}

async function deleteComment(req, res) {
    const postId = req.params.id
    const commentId = req.body.commentId

    const post = await Model.findById(postId)

    for(let i = 0; i < post.comments.length; i++){
        if(post.comments[i].id === commentId){
            post.comments.splice(i, 1)
        }
    }

    const data = await post.save()
    res.status(200).json(data)
}

// Like a post
async function likePost(req, res) {
    const postId = req.params.id
    const userId = req.body.userid
    const post = await Model.findById(postId) //looking up the post in our database that matches the post in our route

    post.likes.push(userId) // since likes is an array, push puts stuff in an array. we are adding new likes to the array using push
    
    const data = await post.save() //whenever it pulls an object from the database it is a copy of it, so we have to resave it using the .save()
    
    res.status(200).json(data)
}

async function unlikePost(req, res) {
    const postId = req.params.id
    const userId = req.body.userid
    const post = await Model.findById(postId)

    const index = post.likes.indexOf(userId)
    post.likes.splice(index, 1)

    const data = await post.save()

    res.status(200).json(data)
}




module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost, 
    deletePost,
    addComment,
    deleteComment,
    likePost,
    unlikePost
}