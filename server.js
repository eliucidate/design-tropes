const http = require('http');
const express = require('express');
const session = require('client-sessions');

const app = express();
const path = require("path");

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const pg = require('pg')
pg.defaults.ssl = true;

const Pool = pg.Pool;

var config = {
  host: 'ec2-54-243-252-91.compute-1.amazonaws.com',
  user: 'bbdseoxtigdrdg',
  password: 'a940dd79823771d11c5fa7f66ef22a7bd188a02ba5af1affa22d38266d376542',
  database: 'd45iptetmms9kj',
};

process.on('unhandledRejection', function(e) {
  console.log(e.message, e.stack)
})

// create the pool somewhere globally so its lifetime
// lasts for as long as your app is running
var pool = new Pool(config)

pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool 
  // the pool itself will emit an error event with both the error and 
  // the client which emitted the original error 
  // this is a rare occurrence but can happen if there is a network partition 
  // between your application and the database, the database restarts, etc. 
  // and so you might want to handle it and at least log it out 
  console.error('idle client error', err.message, err.stack)
})

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
// 5. load pages with updated info... (respond to GET probs?)

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
  //return 404 if not
  response.sendFile(__dirname+'/public/gradients.html');

});

app.post('/entries/add', addDB);
app.post('/entries/update', updateDB);
app.get('/entries/add', queryDB);

function addDB(request, response) {
  let description = request.body.message;
  let title = request.body.title;
  //var file = request.body.file; 
  //update DB
  let rsp = "add success";
  var sql = "INSERT INTO entries (name, description) VALUES ($1, $2)";
  pool.query(sql, [title, description], function(error, data){
	  if (error){
		  rsp = error;
		  console.log(error);
	  } else {
		  console.log(data);
	  }
	});
  response.json({value:rsp});
};

function updateDB(request, response) {
  let description = request.body.message;
  let title = request.body.title;
  //var file = request.body.file; 
  //update DB
  let rsp = "update success";
  var sql = "UPDATE entries SET description = ($2) WHERE title=($1)";
  pool.query(sql, [title, description], function(error, data){
	  if (error){
		  rsp = error;
		  console.log(error);
	  } else {
		  console.log(data);
	  }
	});
  response.json({value:rsp});
};

function queryDB(req, resp){
	let title = request.body.title;
	let rsp = "error: entry not found";
	var q = conn.query("SELECT description FROM message WHERE room =($1), [title], function(error, data){
	  if (error){
		  console.log(error);
	  } else {
		  resp.json(data);
	  }
	});
}


pool
  .query('CREATE TABLE IF NOT EXISTS entries (name varchar(40) NOT NULL, description text NOT NULL, CONSTRAINT production UNIQUE(name))')
  .then(function() {
    app.listen(8080, function() {
      console.log('server is listening on 8080')
    })
  })