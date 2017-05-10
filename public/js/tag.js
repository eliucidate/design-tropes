$(document).ready(function(){
    getRelatedEntries();
});
var tag = window.location.pathname.split('/tag/')[1];
function getRelatedEntries(){
	$.get('/tags/' + tag, function(res){
		    document.getElementById('ctitle').innerHTML = tag;
			let rels = document.getElementById('tagList');
			if (!res[0]) {
				document.getElementById("error").innerHTML = "No entries found for that tag."
			}
			for (row in res) {
					let a = document.createElement('a');
					let linkText = document.createTextNode(res[row].name);
					a.appendChild(linkText);
					a.href = "../"+res[row].url;
					a.className = "trope";
					rels.appendChild(a);
					rels.appendChild(document.createElement("br"));
				
			}
		});
}