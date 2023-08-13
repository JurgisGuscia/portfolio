require('dotenv').config();
var sslRedirect = require('heroku-ssl-redirect').default;
const express = require("express");
const bodyParser = require("body-parser");
const Mailjet = require("node-mailjet");
const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(sslRedirect());
const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE
});

app.get("/*", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res)=>{
    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: "NyxPlatform@mail.com",
                Name: "Portfolio"
              },
              To: [
                {
                  Email: "j.d.guscia@gmail.com",
                }
              ],
              Subject: req.body.name,
              htmlPart: req.body.message + "<br><br>" + "Kontaktinis elektroninis paštas: " + req.body.email,
            }
          ]
        })

    request
        .then((result) => {
            res.redirect("/activeReturns")
        })
        .catch((err) => {
            res.redirect("/activeReturns")
        })
})

app.listen(3000, ()=>{
    console.log("server listening on port 3000");
})