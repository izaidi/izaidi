// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults


function flipHover(side) {
	$('#pages').css('opacity', 0.8);
	$('#'+side+'page').show();
}

function flipUnhover(side) {
	$('#pages').css('opacity', 1.0);
	$('#'+side+'page').hide();
}

function photoHover() {
	$('#blackbox').show();
	$('#startreading').show();
}

function photoUnhover() {
	$('#blackbox').hide();
	$('#startreading').hide();
}

function showPhotoAgain() {
	$("#photo").show();
	$("#startreading").show();
	$("#pages").hide();
	$("#readertools").hide();
}

function startReading() {
	$("#photo").hide();
	$("#startreading").hide();
	$("#pages").show();
	$("#readertools").show();
	curpage = 1;
}

function loadPage(page) {
	fileroot = 'images/spreads/';
	if (page < 10) {
		filename = '0' + page + '.png';
	} else {
		filename = page + '.png';
	}
	file = fileroot + filename;
	$("#pages").css('background-image', 'url("'+file+'")');
}

function nextPage() {
	curpage++;
	if (curpage > 32) {
		curpage--;
		alert("NO MORE ANY LEFT");
	} else {
		flipUnhover('next');
		loadPage(curpage);
	}
}

function lastPage() {
	curpage--;
	flipUnhover('last');
	if (curpage == 0) {
		showPhotoAgain();
	} else {
		loadPage(curpage);
	}
}

function readerPosition() {
	var margin = 40;
	var offset = ($(window).width() - 1071)/2;
	if (offset < 0) {
		var newwidth = $(window).width() - offset;
		$("#reader").css('left', offset+'px');
		$("#reader").css('width', newwidth+'px');
	} else {
		$("#reader").css('left', '0px');
		$("#reader").css('width', '100%');
		margin += offset;
	}
	$("#nextpage").css('right', margin+'px');
	$("#lastpage").css('left', margin+'px');
}

function pagesClicked(event) {
	if (event.pageX < ($(window).width() / 2)) {
		lastPage();
	} else {
		nextPage();
	}
}

$(document).ready(function() {
	readerPosition();
});

$(window).resize(function() {
	readerPosition();
});