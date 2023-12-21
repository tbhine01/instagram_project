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



module.exports = {
    createPost
}