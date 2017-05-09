function trim(str) {
	str = str.replace(/\s/g, "-");
	return str;
}
function sendMessage(){
	var message = document.getElementById('textarea').innerHTML;
	var tag = document.getElementById('cat').value;
	var title = document.getElementById('stitle').value;
	var file = document.getElementById('filein').files;
	console.log(title, file, message, tag);
	$.post('/entries/add', {message: message, title:title, tag:tag}, function(res){
			console.log(res);
			if (res.value == "success") {
				window.location.href = trim(title);
			} else {
				let err = document.getElementById('errormsg');
				err.style.display = "block";
			}
		});
}