if(typeof(String.prototype.trim) === "undefined")
{
    String.prototype.trim = function() 
    {
        return String(this).replace(/^\s+|\s+$/g, '-');
    };
}

function sendMessage(){
	var message = document.getElementById('textarea').innerHTML;
	var title = document.getElementById('stitle').value;
	var file = document.getElementById('filein');
	console.log(title, file, message);
	$.post('/entries/add', {message: message, title:title}, function(res){
			console.log(res);
			if (res.value == "success") {
				window.location.href = title.trim();
			} else {
				let err = document.getElementById('errormsg');
				err.style.display = "block";
			}
		});
}