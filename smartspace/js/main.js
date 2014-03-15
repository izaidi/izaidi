function placeObjects() {
  var buffer = 1.5;
  var object_area = $('.'+size).height();
  var min_x = 0;
  var max_x = winWidth - (buffer * object_area);
  var min_y = 80;
  var max_y = winHeight - (buffer * object_area);
  var filled_areas = new Array();
  
  $('.avoid').each(function() {
    var position = $(this).position();
    area = {x: position.left, y: position.top, width: $(this).width(), height: $(this).height()};
    filled_areas.push(area);
  });

  $('.person').each(function() {
    var rand_x=0;
    var rand_y=0;
    var area;
    var tries = 0;
    do {
      rand_x = Math.round(min_x + ((max_x - min_x)*(Math.random() % 1)));
      rand_y = Math.round(min_y + ((max_y - min_y)*(Math.random() % 1)));
      area = {x: rand_x, y: rand_y, width: $(this).width() * buffer, height: $(this).height() * buffer};
      tries = tries + 1;
    } while(check_overlap(area, tries));
    console.log(tries + ' tries to get placement');
    filled_areas.push(area);
    $(this).css({left: rand_x, top: rand_y});
  });
  
  function check_overlap(area, tries) {
    if (tries > 1000) {
      console.log('too many tries');
      return false;
    }
    for (var i = 0; i < filled_areas.length; i++) {
      check_area = filled_areas[i];
      var bottom1 = area.y + area.height;
      var bottom2 = check_area.y + check_area.height;
      var top1 = area.y;
      var top2 = check_area.y;
      var left1 = area.x;
      var left2 = check_area.x;
      var right1 = area.x + area.width;
      var right2 = check_area.x + check_area.width;
      if (bottom1 < top2 || top1 > bottom2 || right1 < left2 || left1 > right2) {
        continue;
      }
      return true;
    }
    return false;
  }
}

$(document).ready(function(){
  var smallPath = "M58,29c0,16.016-12.984,29-29,29S0,45.016,0,29S12.984,0,29,0S58,12.984,58,29z"
  var mediumPath = "M100.252,50.125c0,27.683-22.442,50.125-50.126,50.125S0,77.807,0,50.125C0,22.44,22.442,0,50.126,0S100.252,22.44,100.252,50.125z";
	var walkers = [];
	var allWalkers = [];
	
	// handles whatever moves along the path
	function AnimateWalker(walker){
		this.pathAnimator = new PathAnimator(path);
		this.walker = walker;
		this.reverse = Math.random()<.5; // random boolean
		console.log(this.reverse);
		this.speed = 30;
		this.easing = '';
		this.startOffset = Math.floor(Math.random()*100);;
		this.startX = parseInt($(walker).css('left'));
		this.startY = parseInt($(walker).css('top'));
		this.bg = $(walker).css('background-image');
	}

	AnimateWalker.prototype = {
		start : function(){
			//this.walker.style.cssText = "";
			//this.startOffset = (this.reverse || this.speed < 0) ? 100 : 0; // if in reversed mode, then animation should start from the end, I.E 100%
			this.pathAnimator.context = this; // just a hack to pass the context of every Walker inside it's pathAnimator
			this.pathAnimator.start( this.speed, this.step, this.reverse, this.startOffset, this.finish, this.easing);
		},

		// Execute every "frame"
		step : function(point, angle){
			this.walker.style.cssText = "top:" + (point.y + this.startY) + "px;" + 
										"left:" + (point.x + this.startX) + "px;" + 
										"background-image:" + this.bg;
		},

		// Restart animation once it was finished
		finish : function(){
		  this.startOffset = (this.reverse || this.speed < 0) ? 100 : 0;
			this.start();
		},

		// Resume animation from the last completed percentage (also updates the animation with new settings' values)
		resume : function(){
			this.pathAnimator.start( this.speed, this.step, this.reverse, this.pathAnimator.percent, this.finish, this.easing);
		}
	}

	function generateWalker(walkerObj){
		var newAnimatedWalker = new AnimateWalker(walkerObj);
		walkers.push(newAnimatedWalker);
		return newAnimatedWalker;
	}
	
	sizes = ['big', 'medium', 'small', 'tiny', 'puny'];
	size = '';
	path = '';
	sizeWidths = [300, 200, 150, 100, 75];
	winWidth = $(window).width();
	winHeight = $(window).height();
	
	var jsonURL = $('body').data('json');
	
	$.getJSON(jsonURL, function(data) {
    var people = [];
    var population = 0;
    $.each(data, function(key, val) {
      if (val.firstName != 'Notman') {
        var person = $('.dummy').clone();
        var name = val.firstName + ' ' + val.lastName;
        var company = val.companyName;
        person.removeClass('dummy');
        person.addClass('person');
        person.attr('id', key);
        person.css('background-image', 'url('+val.portraitImageUrl+')');
        $('.name', person).html(name);
        $('.company', person).html(company);
        people.push(person);
        population++;
      }
    });
    
    // calculate appropriate size
    $.each(sizeWidths, function(index, width) {
      var maxPop = (winWidth * winHeight) / (8 * width * width);
      if (maxPop > population) {
        size = sizes[index];
        console.log('size found: ' + size);
        return false;
      }
    });
    
    if (size == 'big' || size == 'medium') {
      path = mediumPath;
    } else {
      path = smallPath;
    }
    
    $.each(people, function(index, person) {
      person.addClass(size)
      person.appendTo($('#people'));
    });
    
    placeObjects();
    
    $('.person').each(function() {
      var thisWalker = generateWalker($(this)[0]);
    	thisWalker.start();
    	allWalkers.push(thisWalker);
    });
    
    var increases = [60, 40, 30, 20, 16];
    var labelShifts = [-30, -20, -15, -10, -8];
    var labelTops = [];
    $.each(sizes, function(index, val) {
      labelTops.push(parseInt($('.' + val + ' > .label').css('top')));
    });

  	$('.person').hoverIntent(function() {
  	  $.each(allWalkers, function(index, thisWalker) {
  	    thisWalker.pathAnimator.stop();
  	  });
  	  
  	  var label = $('.label', this);
  	  var borderWidth = parseInt($(this).css('border-width'));
  	  var increase, newBorder, newlabelTop;
  	  var labelTop = label.css('top');

      var sizeIndex = sizes.indexOf(size);
      increase = increases[sizeIndex];
      newBorder = borderWidth + increase;
      newLabelTop = labelTops[sizeIndex] + labelShifts[sizeIndex];

  	  $(this).animate({borderWidth: newBorder+'px'}, {duration: 500, queue: false});
  	  $(this).animate({top: '-='+increase+'px'}, {duration: 500, queue: false});
  	  $(this).animate({left: '-='+increase+'px'}, {duration: 500, queue: false});
  	  label.animate({top: newLabelTop+'px'}, {duration: 500, queue: false});
  	  label.animate({paddingBottom: -labelShifts[sizeIndex]+'px'}, {duration: 500, queue: false});
  	  label.css({color: 'black'});
  	}, function() {
  	  $.each(allWalkers, function(index, thisWalker) {
  	    thisWalker.resume();
  	  });
  	  
  	  var label = $('.label', this);
  	  var sizeIndex = sizes.indexOf(size);
  	  var labelTop = labelTops[sizeIndex];

  	  label.css({color: 'white'});
  	  label.animate({top: labelTop+'px'}, {duration: 300, queue: false});
  	  label.animate({paddingBottom: 0}, {duration: 300, queue: false});
  	});
  });

});