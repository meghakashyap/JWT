const jwt = require('jsonwebtoken')
const dotenv =require('dotenv')
const express = require('express');
const app = express()

dotenv.config();

// var token = process.env.Token;
// console.log(token)

// Generating a Token
function createToken(userName){
    return jwt.sign(userName,process.env.Token,{expiresIn:'1800s'});
}

app.post('/',(req,res)=>{
    const token = createToken({userName:req.params.userName})
});

// Authenticating a Token
function authencticateToken(req,res,next){
    const authHeader = req.headers(['authorization'])
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token,process.env.Token.toString(),(err,user)=>{
        console.log(err)


    if (err) return res.sendStatus(403)

    req.user = user

    next()
    }) 

}




app.listen(4000,(req,res)=>{
    console.log(`LISTENING PORT NO 4000`)
})



