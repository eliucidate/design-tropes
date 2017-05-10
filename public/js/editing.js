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
				let links = res[0].links;
				for (i in links) {
					let g = parseInt(i) + 1;
					document.getElementById('link'+ g).value = links[i];
				}
			} else {
				document.getElementById('error').innerHTML = "Entry not found";
			}
		});
}

function sendMessage(){
	var message = document.getElementById('textarea').innerHTML;
	var tag = document.getElementById('cat').value;
	var title = document.getElementById('stitle').value;
	let files = [];
	for (i =1; i < 7; i++){
		let filetemp = document.getElementById('link'+i).value;
		if (filetemp != ""){
			files.push(filetemp);
		}
	}
	$.post('/entries/update', {message: message, url:entryName.slice(1), title:title, tag:tag, files:files}, function(res){
		if (res.value == "success"){
			document.getElementById('error').innerHTML = "Changes successfully added";
			console.log(res);
		} else if (res.value == "broken link"){
			document.getElementById('error').innerHTML = "Invalid links";
			console.log(res);
		} else {
			document.getElementById('error').innerHTML = "Changes could not be committed.";
		}
		});
}

function done() {
	window.location.href = entryName;
}