// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

xpos = 0;
ypos = 0;
selected = '';
mustresetroll = false;

function roll() {
	var docwidth = $(window).width();
	var midpoint = docwidth / 2;
	
	var delta = xpos - midpoint;
	var normdelta = delta / midpoint;
	if (normdelta < 0) {
		normdelta = -normdelta;
	}
	
	$("#thumbs").stop();
	
	var totalwidth = $("#thumbs").width();
	var startpos = midpoint - 70;
	var endpos = -totalwidth + midpoint + 70;
	var curpos = parseInt($("#thumbs").css('left'));
	
	if (normdelta > 0.4) {
		var travel = (normdelta-0.4) * 2000;
		if (delta < 0) {
			if (curpos + travel > startpos) {
				$("#thumbs").animate({left: startpos}, 1000, "linear");
			} else {
				$("#thumbs").animate({left: '+='+travel}, 1000, "linear");
			}
		} else {
			if (curpos - travel < endpos) {
				$("#thumbs").animate({left: endpos}, 1000, "linear");
			} else {
				$("#thumbs").animate({left: '-='+travel}, 1000, "linear");
			}
		}
	}
	
}

function select(img) {
	$("#thumbs").stop();
	$("#thumb"+img).removeClass('unselected');
	$("#thumb"+img).addClass('selected');
	$("#thumblink"+img).removeClass('unselected');
	$("#thumblink"+img).addClass('selected');
	if (selected != '') {
		$("#thumb"+selected).removeClass('selected');
		$("#thumb"+selected).addClass('unselected');
		$("#thumblink"+selected).removeClass('selected');
		$("#thumblink"+selected).addClass('unselected');
	}
	
	var offset = $("#thumb"+img).position().left;
	
	var docwidth = $(window).width();
	var midpoint = docwidth / 2;
	var startpos = midpoint - 70;
	
	var newpos = startpos - offset;
	$("#thumbs").animate({left: newpos}, 300, "swing");
	$("#thumbs").unbind();
	mustresetroll = true;
	
	spread = $('<img id="spread'+img+'" src="images/spreads/'+img+'.jpg" width="900" height="534" class="hidden" />');
	$("#spread > img").remove();
	$("#spread").prepend(spread);
	
	spread.load(function() {
		spread.fadeIn(500);
	})
	
	selected = img;
}

function navAbout() {
	$('#navlookh').hide();
	$('#navbuyh').hide();
	$('#navlook').show();
	$('#navbuy').show();
	
	$('#navabout').hide();
	$('#navabouth').show();
	
	$('.buy').fadeOut(300);
	$('.look').fadeOut(300);
	setTimeout("$('.about').fadeIn(300);", 300);
}

function navLook() {
	$('#navabouth').hide();
	$('#navbuyh').hide();
	$('#navabout').show();
	$('#navbuy').show();
	
	$('#navlook').hide();
	$('#navlookh').show();
	
	$('.buy').fadeOut(300);
	$('.about').fadeOut(300);
	setTimeout("$('.look').fadeIn(300);", 300);
}

function navBuy() {
	$('#navabouth').hide();
	$('#navlookh').hide();
	$('#navabout').show();
	$('#navlook').show();
	
	$('#navbuy').hide();
	$('#navbuyh').show();
	
	$('.look').fadeOut(300);
	$('.about').fadeOut(300);
	setTimeout("$('.buy').fadeIn(300);", 300);
}

function toNumString(number) {
	numString = '';
	if (number < 10) {
		numString = '00' + number.toString();
	} else {
		numString = '0' + number.toString();
	}
	return numString;
}

$(document).ready(function() {
	var spreadsArray = [];
	var numSpreads = 24;
	for (var i=1; i<24; i++) {
		var spreadString = toNumString(i);
		spreadsArray.push(spreadString);
	}
	$.each(spreadsArray, function(index, value) {
		var img = $('#imgTemplate').clone();
		img.click(function() {
			select(value);
		});
		img.attr('id', "thumblink"+value);
		$('img', img).attr('src', "images/spreads/t"+value+".jpg");
		$('img', img).attr('id', "thumb"+value);
		img.removeClass('hidden');
		console.log(img.html());
		$('#thumbs').append(img);
	});
	
	$('#thumbs').mouseover(function(event) {
		roll();
	});
	
	var randNum = Math.floor((Math.random()*20)+1);
	var randString = toNumString(randNum);
	console.log(randString);
	select(randString);
})

$(document).mousemove(function(event) {
	xpos = event.pageX;
	ypos = event.pageY;
	
	if (mustresetroll) {
		if (ypos < 230 || ypos > 400) {
			$('#thumbs').mouseover(function(event) {
				roll();
			});
			
			mustresetroll = false;
		}
	}
});