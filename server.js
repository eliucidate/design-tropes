const http = require('http');
const express = require('express');
const session = require('client-sessions');

const app = express();
const path = require("path");

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
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

//helper trim function
function trim(str) {
	str = str.replace(/\s/g, "-");
	return str;
}


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
  response.sendFile(__dirname+'/public/gradients.html');
});

app.get('/:entryName/edit', function(request, response){
  response.sendFile(__dirname+'/public/editing.html');
});

app.get('/tag/:tagName', function(request, response){
  response.sendFile(__dirname+'/public/tags.html');
});

app.post('/entries/add', addDB);
app.post('/entries/update', updateDB);
app.get('/get/new', queryNew);
app.get('/entries/:entryName', queryDB);
app.get('/tags/:tagName', queryTag);
var validUrl = require('valid-url');

function addDB(request, response) {
  let description = request.body.message;
  let title = request.body.title;
  let tag = request.body.tag;
  let files = request.body.files; 
  console.log(title, description, tag, files);
  for (i in files){
	  console.log(files[i]);
	  if (!validUrl.isWebUri(files[i])){
		  response.json({value:"broken link"});
		  return;
	  }
  }
  //update DB
  let filestr = JSON.stringify(files).slice(1, -1);
  filestr = '{' + filestr + '}';
  //console.log(filestr);
  let rsp = "add success";
  var sql = "INSERT INTO entries (name, url, description, tag, links) VALUES ($1, $2, $3, $4, $5)";
  pool.query(sql, [title, trim(title), description, tag, filestr], function(error, data){
	  if (error){
		  response.json({value:"error"});
		  console.log(error);
	  } else {
		  console.log(data);
		  response.json({value:"success"});
	  }
	});
};

function updateDB(request, response) {
  let description = request.body.message;
  let title = request.body.title;
  let tag = request.body.tag;
  let url = request.body.url;
  let files = request.body.files; 
  console.log(title, description, tag, files);
  for (i in files){
	  console.log(files[i]);
	  if (!validUrl.isWebUri(files[i])){
		  response.json({value:"broken link"});
		  return;
	  }
  }
  //update DB
  let filestr = JSON.stringify(files).slice(1, -1);
  filestr = '{' + filestr + '}';
  //var file = request.body.file; 
  //update DB
  let rsp = "update success";
  var sql = "UPDATE entries SET name=($1),description =($2), tag=($3), edits=edits+1, created_at=NOW(), links=($5) WHERE url=($4)";
  pool.query(sql, [title, description, tag, url, filestr], function(error, data){
	  if (error){
		  response.json({value:"error"});
		  console.log(error);
	  } else {
		  response.json({value:"success"});
	  }
	});
};

function queryDB(request, resp){
	let title = request.params.entryName;
	//console.log(title);
	var q = pool.query("SELECT name, description, tag, created_at, edits, links FROM entries WHERE url=($1)", [title], function(error, data){
	  if (error){
		  resp.json('Error: Entry not Found!');
		  console.log(error);
	  } else {
		  resp.json(data.rows);
	  }
	});
}

function queryTag(request, resp){
	let title = request.params.tagName;
	if (title=='all'){
		let q = pool.query("SELECT name, url FROM entries", function(error, data){
	  if (error){
		  resp.json('Error: Entry not Found!');
		  console.log(error);
	  } else {
		  resp.json(data.rows);
	  }
	});
	} else {
	//console.log(title);
		let q = pool.query("SELECT name, url FROM entries WHERE tag=($1)", [title], function(error, data){
		  if (error){
			  resp.json('Error: Entry not Found!');
			  console.log(error);
		  } else {
			  resp.json(data.rows);
		  }
		});
	}
}

function queryNew(request, resp){
	let title = request.params.tagName;
	//console.log(title);
	var q = pool.query("SELECT name, description, url, edits, created_at FROM entries ORDER BY created_at DESC limit 10", function(error, data){
	  if (error){
		  resp.json('Error: Entry not Found!');
		  console.log(error);
	  } else {
		  resp.json(data.rows);
	  }
	});
}

pool
  .query('CREATE TABLE IF NOT EXISTS entries (name varchar(40) NOT NULL, url varchar(40) NOT NULL, description text NOT NULL, tag varchar(40) NOT NULL, created_at timestamptz NOT NULL DEFAULT now(), edits INTEGER NOT NULL DEFAULT 0, links text[], CONSTRAINT production UNIQUE(url), CONSTRAINT nameoverlap UNIQUE(name))')
  .then(function() {
    app.listen(8080, function() {
      console.log('server is listening on 8080')
    })
  })