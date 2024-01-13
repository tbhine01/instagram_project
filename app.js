// Import Framework
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const queries = require('./queries.js')
const tokenManger = require('./token-manager.js')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const cors = require('cors')


// Express Config
app.use(cors())
app.use(bodyParser.json())

//Mongoose Config
const dbString = process.env.DATABASE_URL

mongoose.connect(dbString)

const database = mongoose.connection

// Database Connection 
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log("MongoDB Connected")
})

// Routes
app.get("/", (req, res) => {
    res.send("Hello World")
})

// Posts 

// Create Posts
app.post('/createpost', tokenManger.authenticateToken, queries.createPost)

// Get all Posts
app.get('/posts', tokenManger.authenticateToken, queries.getPosts)

// Get Post by ID
app.get('/post/:id', tokenManger.authenticateToken, queries.getPostById)

// Update one Post by ID
app.put('/updatepost/:id', tokenManger.authenticateToken, queries.updatePost)

// Delete Post
app.delete('/deletepost', tokenManger.authenticateToken, queries.deletePost)

// Create Comment
app.post('/post/:id/addcomment', tokenManger.authenticateToken, queries.addComment)

// Delete Comment
app.delete('/post/:id/deletecomment', tokenManger.authenticateToken, queries.deleteComment)

// Like a post
app.post('/post/:id/like', tokenManger.authenticateToken, queries.likePost)

//Unlike a Post
app.post('/post/:id/unlike', tokenManger.authenticateToken, queries.unlikePost)


// Users

// Get User by ID
app.get('/user/:id', tokenManger.authenticateToken, queries.getUser)

// Register New User
app.post('/user', queries.createUser)

// Delete User (only yourself)
app.delete('/user/:id', tokenManger.authenticateToken, queries.deleteUser)

// Update User Info
app.put('/user/:id', tokenManger.authenticateToken, queries.updateUser)

// Login 
app.post('/login', queries.login)




app.listen(3000)
console.log("Express is running")