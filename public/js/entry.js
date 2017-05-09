$(document).ready(function(){
    getEntry();
});

var entryName;
function getEntry(){
	entryName = window.location.pathname.split('.html')[0];
	$.get('/entries' + entryName, function(res){
			console.log(res);
			if (res[0]) {
				document.getElementById('ctitle').innerHTML = res[0].name;
				document.getElementById('content').innerHTML = res[0].description;
				document.getElementById('timestamp').innerHTML = "Last updated: " + res[0].created_at.slice(0,-8);
				getRelatedEntries(res[0].tag, res[0].name);
			} else {
				document.getElementById('entrycontent').innerHTML = "<h2>Entry not found</h2>";
			}
		});
}

function edit() {
	window.location.href = entryName+'/edit';
}
function getRelatedEntries(tag, name){
	$.get('/tags/' + tag, function(res){
			let rels = document.getElementById('footer');
			//console.log(res);
			for (row in res) {
					if (res[row].name != name){
					let a = document.createElement('a');
					let linkText = document.createTextNode(res[row].name);
					a.appendChild(linkText);
					a.href = res[row].url;
					a.className = "trope";
					rels.appendChild(a);
					rels.appendChild(document.createElement("br"));
				}
			}
		});
}