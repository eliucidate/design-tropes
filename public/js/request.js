function sendMessage(){
	var message = document.getElementById('textarea').innerHTML;
	var title = document.getElementById('stitle').value;
	var file = document.getElementById('filein');
	console.log(title, file, message);
	$.post('/entries/add', {message: message, title:title}, function(res){
			console.log(res);
		});
}