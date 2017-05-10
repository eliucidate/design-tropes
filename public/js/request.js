function trim(str) {
	str = str.replace(/\s/g, "-");
	return str;
}
function sendMessage(){
	var message = document.getElementById('textarea').innerHTML;
	var tag = document.getElementById('cat').value;
	var title = document.getElementById('stitle').value;
	let files = [];
	for (i =1; i < count + 1; i++){
		let filetemp = document.getElementById('link'+i).value;
		if (filetemp != ""){
			files.push(filetemp);
		}
	}
	console.log(title, files, message, tag);
	$.post('/entries/add', {message: message, title:title, tag:tag, files:files}, function(res){
			console.log(res);
			if (res.value == "success") {
				window.location.href = trim(title);
			} else if (res.value =="broken link"){
				let err = document.getElementById('errormsg');
				err.innerHTML = "Invalid link."
				err.style.display = "block";
			} else {
				let err = document.getElementById('errormsg');
				err.innerHTML = "Entry name already exists."
				err.style.display = "block";
			}
		});
}

var count=1;
function showLink(){
	if (count < 6){
		count++;
		document.getElementById('link'+count).style.display = "block";
	} else {
		document.getElementById("adderror").innerHTML = "A maximum of six files are allowed";
	}
}