function openNav() {
	document.getElementById("myNav").style.paddingRight = "123px"
	document.getElementById("myNav").style.paddingLeft = "123px"
    document.getElementById("myNav").style.height = "100%";
    document.getElementById("myNav2").style.padding = "0px"
    document.getElementById("myNav2").style.height = "0%";
    document.getElementById("loginform").style.padding = "0px"
    document.getElementById("loginform").style.height = "0%";
}

function closeNav() {
	document.getElementById("myNav").style.padding = "0px"
    document.getElementById("myNav").style.height = "0%";
}

function openNav2() {
	document.getElementById("myNav2").style.paddingRight = "123px"
	document.getElementById("myNav2").style.paddingLeft = "123px"
    document.getElementById("myNav2").style.height = "100%";
}

function closeNav2() {
	document.getElementById("myNav2").style.padding = "0px"
    document.getElementById("myNav2").style.height = "0%";
    document.getElementById("myNav").style.padding = "0px"
    document.getElementById("myNav").style.height = "0%";
}

function openLogin() {
	//document.getElementById("background").style.height = "100%";
	document.getElementById("loginform").style.paddingRight = "123px"
	document.getElementById("loginform").style.paddingLeft = "123px"
    document.getElementById("loginform").style.height = "100%";

}

function closeLogin() {
	document.getElementById("loginform").style.padding = "0px"
    document.getElementById("loginform").style.height = "0%";
    document.getElementById("myNav").style.padding = "0px"
    document.getElementById("myNav").style.height = "0%";
    document.getElementById("myNav2").style.padding = "0px"
    document.getElementById("myNav2").style.height = "0%";
    //document.getElementById("background").style.height = "0%";
}

function getTag(input) {
	window.location.href = "/tag/" + input;
}