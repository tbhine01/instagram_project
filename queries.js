const Model = require("./schema.js")
const Pool = require('pg').Pool
const tokenManger = require('./token-manager.js')
require('dotenv').config()

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 5432
})


async function createPost(req, res) {
    await pool.query('SELECT username FROM users WHERE id = $1', [req.user], (async (error, results) => {
        if(error) {
            throw error
        }
        let username = results.rows[0].username
        const post  = new Model({
            userid: req.user,
            username: username,
            image: req.body.image,
            timestamp: Date.now()
        })
        if(req.body.caption) {
            console.log(req.body.caption)
            post.caption = req.body.caption
        } 
        const savePost = await post.save()
        res.status(200).json(savePost)   
    }))
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
    const userId = req.user
    const post = await Model.findById(postId)

    const index = post.likes.indexOf(userId)
    post.likes.splice(index, 1)

    const data = await post.save()

    res.status(200).json(data)
}

// Postgres User Table

async function getUser(req, res) {
    const id = req.user

    await pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if(error){
            throw error 
        }
        res.status(200).json(results.rows)
    })
}

async function createUser(req, res) {
    const email = req.body.email
    const username = req.body.username
    const password = req.body.password

    await pool.query('INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING *', [email, username, password], (error, results) => {
        if (error){
            throw error 
        }

        res.status(201).send(results.rows) //201 means it successfully posted
    })
}

async function deleteUser (req, res) {
    const id = req.user
    await pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if(error){
            throw error 
        }

        res.status(200).send(`User${id} has been deleted`)
    })
}

async function updateUser (req, res) {
    const id = req.user

    const email = req.body.email
    const username = req.body.username
    const password = req.body.password

    await pool.query('UPDATE users SET email = $1, username = $2, password = $3 WHERE id = $4', [email, username, password, id], (error, results) => {
        if(error){
            throw error 
        }

        res.status(200).send(`User ${id} info has been modified successfully`)
    })
}

async function login (req, res) {
    const email = req.body.email
    const password = req.body.password

    await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (error, results) => {
        if(error){
            throw error 
        }

        const token = tokenManger.generateAccessToken(results.rows[0].id) //generate our access token with the ID we get back from the database
        res.status(200).json(token) //we are sendong back the token
    })
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
    unlikePost,
    getUser,
    createUser,
    deleteUser,
    updateUser,
    login
}