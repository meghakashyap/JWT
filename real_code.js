const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json())
app.use(express.json())

app.post("/api/login", (req, res, next) => {
    const user = {
      id: 1,
      username: "john",
      email: "john@gmail.com"
    };
    const password = '***'
    if(user.username === req.body.username && password === req.body.password) {
      jwt.sign({ user: user }, "secretkey", (err, token) => {
        res.cookie('token',token);
        console.log(token,"....");
        res.status(200).json(
            "Auth successful"
          );
      });
    }
    else {
      res.status(401).json('Unauthorized client')
    }
  });
  
  
  app.post("/verify", (req, res) => {
    const token = req.headers.cookie.split("=")[1]
    // console.log(token,"....");
    jwt.verify(token, "secretkey", (err, authData) => {
      if (err) {
        res.sendStatus(403);
      } else {
        res.json({
          message: "verify successfully.",
          authData
        });
      }
    });
  });

  // server running
app.listen(process.env.PORT || 3000, () => {
    console.log("Server started with express..");
});