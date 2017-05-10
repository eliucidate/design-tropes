$(document).ready(function(){
    getEntry();
});

var entryName;
function getEntry(){
	entryName = window.location.pathname.split('/edit')[0];
	console.log(entryName);
	$.get('/entries' + entryName, function(res){
			console.log(res);
			if (res[0]) {
				document.getElementById('stitle').value = res[0].name;
				document.getElementById('cat').value = res[0].tag;
				document.getElementById('textarea').innerHTML = res[0].description;
			} else {
				document.getElementById('error').innerHTML = "Entry not found";
			}
		});
}

function sendMessage(){
	var message = document.getElementById('textarea').innerHTML;
	var tag = document.getElementById('cat').value;
	var title = document.getElementById('stitle').value;
	var file = document.getElementById('filein').files;
	$.post('/entries/update', {message: message, url:entryName.slice(1), title:title, tag:tag}, function(res){
			document.getElementById('error').innerHTML = "Changes successfully added";
			console.log(res);
		});
}

function done() {
	window.location.href = entryName;
}