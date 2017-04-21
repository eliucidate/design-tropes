const http = require('http');
const express = require('express');
const session = require('client-sessions');

const app = express();
const path = require("path");



app.use(session({
  cookieName: 'mySession', // cookie name dictates the key name added to the request object
  secret: 'xxxdoritoslayerxxsladsandklsankdasl', // should be a large unguessable string
  duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));

// 1. user sessions
// 2. make posts
// 3. edit post
// 4. delete post

app.use(express.static('public'))
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
  // do any work you need to do, then
  response.sendFile(__dirname+'/public/main.html');

})

app.get('/:entryName', function(request, response){
  // do any work you need to do, then
  let entryName = request.params.entryName;
  //check if entry in db
  response.sendFile(__dirname+'/public/gradients.html');

});

app.listen(8080);