const bodyParser = require('body-parser');
var express =require('express');
var app = express();
var jwt = require('jsonwebtoken')
var randtoken = require('rand-token')
var refreshTokens = {}
var SECRET = 'SECRETO_PARA_ENCRIPTACION'
app.use(bodyParser.json())
app.use(bodyParser.json(),urlencoded({extended : true}))

app.post('/login',(req,res)=>{
    var username = req.body.username;
    var password = req.body.username;
    var user = {
        'username' : username,
        'role'     : 'admin'
    }
    var token = jwt.sign(user,SECRET,{expiresIn:300})
    var refreshToken = randtoken.uid(256)
    refreshTokens[refreshToken ]= username.res.json({token : 'JWT' + token, refreshToken:refreshToken})
})


app.post('/token',(req,res,next)=>{
    var username = req.body.username;
    var refreshToken = req.body.refreshToken;
    if ((refreshToken in refreshTokens) && (refreshTokens[refreshToken]== username)){
        var user = {
            'username' : username,
            'role'     : 'admin'
        }
        var token = jwt.sign(user,SECRET,{expiresIn : 300})
        res.json({token :'JWT' + token})
    }
    else{
        res.send(401)
    }

})


app.post('/token/reject',(req,res)=>{
    var refreshToken = req.body.refreshToken
    if (refreshToken in refreshTokens){
        delete refreshTokens[refreshToken]
    }
    res.send(204)
})

app.listen(6000,(req,res)=>{
    console.log("Listening the port no 6000");
});