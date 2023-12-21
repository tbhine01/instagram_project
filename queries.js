const Model = require("./schema.js")

async function createPost(req, res) {
    const post = new Model({
        userid: req.body.userid,
        username: req.body.username,
        image: req.body.image,
        caption: req.body.caption,
        posttimestamp: req.body.posttimestamp
    })

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

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost, 
    deletePost
}