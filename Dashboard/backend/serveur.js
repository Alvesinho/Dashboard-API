const express = require("express");
const app = express();
const util = require('util');
const bodyParser = require('body-parser')
const server = require("http").createServer(app);
const request = require('request');
const cors = require('cors');
const { send } = require("process");
var http = require('https');
const port = 5000;

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5500',
    methods: ["GET", "POST"]
  }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.send(`<h1>Server Launched!</h1>`)
});

server.listen(port, () => console.log("backend running on port:" + port));

app.post('/message', function(req, res) {
    console.log("OK je créer");
  console.log("====> " + util.inspect(req.body, {depth: null}));
  var email = req.body.message.email;
    var id = req.body.message.token
    var to = req.body.message.to
    var subject = req.body.message.subject
    var body = req.body.message.message
    console.log("DATA: " + email);
    console.log("DATA: " + id);
    console.log("DATA: " + to);
    console.log("DATA: " + subject);
    console.log("DATA: " + body);
    sendemail(email, id, to, subject, body)
});

function sendemail(email, id, to, subject, body) {

  console.log("id " + id);
  console.log("from" + email);
  console.log("to " + to);
  console.log("subject " + subject);
  console.log("body " + body);

  var mail = Buffer.from(
  "From: " + email + "\n" +
  "To: " + to + "\n" +
  "Subject: " + subject + "\n\n" +

  ""+ body +""
  ).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');


  var post_options = {
hostname: 'www.googleapis.com',
port: '443',
path: '/gmail/v1/users/me/messages/send',
      method: 'POST',
headers: {
  "Authorization": 'Bearer ' + id,
  "Content-Type" : "application/json"
}
};

    var post_req = http.request(post_options, function(res) {
res.setEncoding('utf8');
res.on('data', function (chunk) {
    console.log('Response: ' + chunk);
});
});

post_req.write(JSON.stringify({ "raw": mail }));
post_req.end();
};
