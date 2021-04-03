var http = require('https');

exports.sendemail = function(email, id, to, subject, body) {

    console.log("id " + id);
    console.log("from" + email);
    console.log("to " + to);
    console.log("subject " + subject);
    console.log("body " + body);
  
    var mail = new Buffer(
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
  