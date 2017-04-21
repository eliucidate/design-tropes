$(document).ready(function(){
    getEntry();
});

function getEntry(){
	let entryName = window.location.pathname.split('.html')[0];
	console.log(entryName);
	$.get('/entries' + entryName, function(res){
			console.log(res);
			document.getElementById('content').innerHTML = res[0].description;
		});
}