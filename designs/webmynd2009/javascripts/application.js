// JavaScript Document

function activateDemoField() {
	if ($("#googledemo").val() == 'type your search here') {
		$("#googledemo").val("");
		$("#googledemo").css("color", "white");
	}
}

function deactivateDemoField() {
	if ($("#googledemo").val() == '') {
		$("#googledemo").css("color", "#828182");
		$("#googledemo").val("type your search here");
		$("#trydemo").show();
		$("#trydemobutton").hide();
	}
}

function init() {
	/*$("#googledemo").css("color", "#828182");
	$("#googledemo").val("type your search here");
	$("#googledemo").blur();
	$("#trydemobutton").hide();*/
	var browser=navigator.appName;
	
	if(/Safari/.test(navigator.userAgent)) {
		$("#taglinemask").attr("id","innertaglinemask");
	}
	
	//Sort out the install buttons
	if (navigator.userAgent.indexOf("Firefox")!=-1) {
		//$("#trydemo").show();
		//$("#trydemoform").show();
	} else if (browser=="Microsoft Internet Explorer" && !navigator.userAgent.toLowerCase().match('msie 6')) {
		//if ("#trydemo") {
		//	$("#trydemo").show();
		//	$("#trydemoform").show();
		//}
		if ($("#publisherlink")) {
			$("#publisherlink").attr('href', "WebMynd.BHO.Setup.exe");
		}
		$("#installlink").attr('href', "WebMynd.BHO.Setup.exe");
		$("#bottominstall").attr('href', "WebMynd.BHO.Setup.exe");
		if ($("#helplink")) {
			$("#helplink").attr('href',"iehelp.html");
		}
		$("#bottominstall").attr('innerHTML', "Install WebMynd<br />for Internet Explorer");
	} else {
		//$("#trydemo").hide();
		//$("#trydemoform").hide();
		if ($("#installlink")) {
			$("#installlink").attr('href',"javascript:alert('WebMynd only supports Firefox 3 and Internet Explorer 7/8 web browsers at present.');");
		} else {
			$("#publisherinstall").attr('href',"javascript:alert('WebMynd only supports Firefox 3 and Internet Explorer 7/8 web browsers at present.');");
		}
		$("#bottominstall").attr('href',"javascript:alert('WebMynd only supports Firefox 3 and Internet Explorer 7/8 web browsers at present.');");
	}
	
	//Hide any items that shouldn't be shown to IE users or should only be shown to IE users
	if (browser=="Microsoft Internet Explorer") {
		$(".noIE").hide();
	} else {
		$(".onlyIE").hide();
	}

        overwrite_cookie();
}

function demoSearchButton(event) {
	$("#trydemo").hide();
	$("#trydemobutton").show();
	var code = 0;
	if (event && event.which){
		code = event.which
	} else {
		code = event.keyCode //character code is contained in IE's keyCode property
	}
	if (code == 13) { 
		demoSearch();
	}
}

function demoSearch() {
	var query = $("#googledemo").val();
	window.open('http://www.webmynd.com/demo?query='+query, '_parent');
}

function overwrite_cookie() {
        document.cookie = 'styletext=; host=www.webmynd.com'
}

window.onload = init;
window.onscroll = odometer;