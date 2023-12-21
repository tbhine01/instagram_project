// Import Framework
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const queries = require('./queries.js')
const bodyParser = require('body-parser')
const app = express()

// Express Config
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

// Create Posts
app.post('/createpost', queries.createPost)

// Get all Posts
app.get('/posts', queries.getPosts)

// Get Post by ID
app.get('/post/:id', queries.getPostById)

// Update one Post by ID
app.put('/updatepost/:id', queries.updatePost)

// Delete Post


app.listen(3000)
console.log("Express is running")