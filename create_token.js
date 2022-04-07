
require('dotenv').config();
const express = require('express');
const app = express()
const jwt = require('jsonwebtoken')
app.use(express.json())



const posts = [
    {
        username : "Megha",
        title : "post 1"
    },
    {
        username : "Ruhi",
        title : "post 2"
    },
]
// table.timestamp('created_at').defaultTo(knex.fn.now());
//         table.timestamp('updated_at').defaultTo(knex.fn.now());
app.get('/posts',authencticateToken,(req,res)=>{

    res.json(posts.filter(post => post.username === req.user.name))
})

app.post('/login',(req,res)=>{
    // Authenticate the user
    const username = req.body.username
    const user = {name : username}

    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken});

})

function authencticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if (err) return res.sendStatus(403)
        req.user = user
    next()

    })
}






app.listen(3000,(req,res)=>{
    console.log('Running on port no 3000')
});