$.fn.pause = function(duration) {
    $(this).animate({ dummy: 1 }, duration);
    return this;
};

function installLinks() {
	var browser=navigator.appName;
	
	if(/Safari/.test(navigator.userAgent)) {
		$("#taglinemask").attr("id","innertaglinemask");
	}
	
	//Sort out the install buttons
	if (navigator.userAgent.indexOf("Windows")!=-1 || navigator.userAgent.indexOf("Win32")!=-1) {
		//If this is Windows
		var href = "#";
		if (browser=="Microsoft Internet Explorer" && !navigator.userAgent.toLowerCase().match('msie 6')) {
			//If this is IE 7 or 8
			href = "WebMynd.Setup.exe";
		} else if (navigator.userAgent.indexOf("Chrome")!=-1) {
			href = "/html/WebMynd.crx";
		} else if (navigator.userAgent.indexOf("Firefox")!=-1) {
			//This is Firefox on Windows
			href = "https://addons.mozilla.org/en-US/firefox/downloads/latest/6416/addon-6416-latest.xpi";
		} else {
			href = "javascript:alert('WebMynd only supports Firefox 3, Internet Explorer 7/8 and Chrome web browsers at present.');";
		}
	} else {
		//This is not Windows
		if (navigator.userAgent.indexOf("Firefox")!=-1) {
			href = "https://addons.mozilla.org/en-US/firefox/downloads/latest/6416/addon-6416-latest.xpi";
		} else if(navigator.userAgent.indexOf("Chrome")!=-1) {
			href = "/html/WebMynd.crx";
		} else {
			href = "javascript:alert('WebMynd only supports Firefox 3, Internet Explorer 7/8 and Chrome web browsers at present.');";
		}
	}
	
	$(".installlink").each(function() {
		$(this).attr('href', href);
	});
	
	//Hide any items that shouldn't be shown to IE users or should only be shown to IE users
	if (browser=="Microsoft Internet Explorer") {
		$(".noIE").hide();
	} else {
		$(".onlyIE").hide();
	}
}

function rotateImages() {
	$('.screenshotfading:first-child').each(function(i) {
		fadeImage($(this));
	});
}

function actionHover(action) {
	$("#"+action+"bg").css('opacity', 0.8);
}

function actionUnhover(action) {
	$("#"+action+"bg").css('opacity', 0.6);
}

function switchCopy(image) {
	var context = image.parent().parent().parent();
	$('.copyactive', context).pause(3000).fadeOut(200, function() {
		$(this).removeClass('copyactive');
		var next = $(this).next();
		if (next.length == 0) {
			next = $('.copyfading:first', context);
		}
		next.addClass('copyactive');
		$('.copyactive', context).fadeIn(200);
	});
}

function fadeImage(image) {
	image.pause(3000).fadeIn(500, function() {
		var src = image.attr('src');
		image.parent().css("background-image", "url('"+src+"')");
		image.hide();
		if (image.hasClass('switchcopy')) {
			switchCopy(image);
		}
		var next = image.next();
		if (next.length == 0) {
			next = image.prevAll('.firstscreenshot');
		}
		fadeImage(next);
	});
}

function numSquares() {
	var width = $(window).width();
	var numsquares = Math.floor(width/80);
	return numsquares;
}

function headerPos() {
	var numsquares = numSquares();
	var headerleft = 41;
	if (numsquares == 13) {
		headerleft = 41;
	} else if (numsquares == 14) {
		headerleft = 121;
	} else if (numsquares >= 15) {
		headerleft = 41 + Math.floor((numsquares-13)/2) * 80;
	}
	$("#header").css('left', headerleft+'px');
}

function mainPos() {
	var numsquares = numSquares();
	var mainleft = 80;
	if (numsquares == 14) {
		mainleft = 160;
	} else if (numsquares >= 15) {
		mainleft = 80 + Math.floor((numsquares-13)/2) * 80;
	}
	$("#mainbg").css('left', mainleft+'px');
	$("#main").css('left', mainleft+'px');
	
	var installwidth = mainleft+340;
	var learnwidth = $(window).width()-880-mainleft+340;
	$("#installbox").css('width', installwidth+'px');
	$("#learnbox").css('width', learnwidth+'px');
}

function scrollEffects() {
	var top = (document.documentElement.scrollTop ?
	        document.documentElement.scrollTop :
	        document.body.scrollTop);
	var actiontop = 338 - (top/0.9);
	if (actiontop < 20) {
		actiontop = 20;
	}
	var slowscroll = 204 - (top/3);
	var headeropacity = 1 - (top/200);
	var navopacity = 1 - (top/250);
	var pitchopacity = 1 - (top - 100)/150;
	var screenshotopacity = 0.8 + (top/200)*0.2;
	//$("#installbox").css('top', actiontop+'px');
	//$("#learnbox").css('top', actiontop+'px');
	$("#header").css('opacity', headeropacity);
	$("#topnav").css('opacity', navopacity);
	$(".pitch").css('opacity', pitchopacity);
	$(".slowscroll").css('top', slowscroll);
	//$(".screenshotcontainer").css('opacity', screenshotopacity);
}

function columnHeights() {
	var lheight = $('.left', '#main').height();
	var rheight = $('.right', '#main').height();
	var maxheight = 900;
	if (lheight > rheight) {
		maxheight = lheight;
	} else {
		maxheight = rheight;
	}
	$('.leftbg').css('height', maxheight+'px');
	$('.rightbg').css('height', maxheight+'px');
}

$(document).ready(function() {
	headerPos();
	mainPos();
	rotateImages();
	columnHeights();
	installLinks();
});

$(window).scroll(function() {
	scrollEffects();
});

$(window).resize(function() {
	headerPos();
	mainPos();
});