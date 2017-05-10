$(document).ready(function(){
    getRelatedEntries();
});
var tag = window.location.pathname.split('/tag/')[1];
function getRelatedEntries(){
	$.get('/tags/' + tag, function(res){
			let rels = document.getElementById('tagList');
			console.log(res);
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