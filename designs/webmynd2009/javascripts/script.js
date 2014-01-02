

function hoverTab(id) {
	if ($("#"+id).css("opacity") > 0) {
		$("#"+id).css("opacity","1.0");
	}
}

function unhoverTab(id) {
	if ($("#"+id).css("opacity") > 0) {
		$("#"+id).css("opacity","0.9");
	}
}

function fadeBottom(top) {
	var height = $('#maintable').height();
	var diff = height - top;
	var windowheight = $(window).height() + 400;
	var browser=navigator.appName;
/*	if (browser=="Microsoft Internet Explorer") {
		if (diff < windowheight) {
			alert('diffless');
			$("#bottomtable").fadeIn(300);
		}
	} else {
		//alert(diff);*/
		if (diff < windowheight) {
			var opacity = (windowheight - diff)/400;
			var percent = opacity * 100;
			$("#bottomtable").css("opacity",opacity);
			//$("#bottomtable").css("-ms-filter","progid:DXImageTransform.Microsoft.Alpha(opacity=50)");
			//$("#bottomtable").css("filter","alpha(opacity=50)");
			$("#whatitis").css("opacity",1-opacity);
			$("#bottomtable").css("z-index",10);
		} else {
			$("#bottomtable").css("opacity",0);
			$("#bottomtable").css("z-index",-1);
		}
	//}
}

function fadeTitle() {
	var top = (document.documentElement.scrollTop ?
        document.documentElement.scrollTop :
        document.body.scrollTop);
	var opacity = (1 - top/80);
	var slowpacity = 1 - top/200;
	$("#header").css("opacity",opacity);
	$("#logo").css("opacity",slowpacity);
	fadeBottom(top);
}


function odometer() {
  var top = (document.documentElement.scrollTop ?
        document.documentElement.scrollTop :
        document.body.scrollTop);
	var offset = 0;
	var opacity = 0;
	if (top > 150) {
		offset = -(top-150)/12;
	} else {
		var opacity = (1 - top/150);
	}
	var slowpacity = 1 - top/300;
  $("#taglinewords").css("background-position","0px "+offset+"px");
	$("#logotitle").css("opacity",opacity);
	$("#helptab").css("opacity",slowpacity);
	$("#whatitis").css("opacity",1-slowpacity);
	fadeBottom(top);
}
