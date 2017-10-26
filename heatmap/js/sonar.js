ANIMATE = true;

palette = ['aqua', 'magenta', 'yellow'];
colorIndex = 0;

placed = false;

function selectColor(colorIndex) {
  var paletteIndex = colorIndex % palette.length;
  return palette[paletteIndex];
}

function placeCircles() {
  if (placed) return false;
  var numCircles = $('.circle').length;
  var circleArea = $(window).width() / numCircles;
  var marginPct = 0.05;
  var marginSize = circleArea * marginPct;
  var circleSize = circleArea - (2*marginSize);
  
  var xPos = 0;
  var yCenter = ($(window).height() - circleSize) / 2;
  var yJitter = yCenter * 0.5;
  var yPos = yCenter;
  var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
  
  $('.circle').each(function(index, circle) {
    xPos += marginSize;
    plusOrMinus *= -1;
    yPos = yCenter + (plusOrMinus * Math.random() * yJitter);
    $(circle).css({
      left: xPos,
      top: yPos,
      width: circleSize,
      height: circleSize
    });
    xPos += circleSize + marginSize;
  });
}

function sizeInnerCircle(id, size) {
  var innerCircle = $('.inner-circle', '#'+id);
  var percentSize = size * 100;
  var margin = (100 - percentSize) / 2;
  var newCSS = {
    width: percentSize+'%',
    height: percentSize+'%',
    top: margin+'%',
    left: margin+'%'
  };
  if (ANIMATE) {
    innerCircle.animate(newCSS, 500, function() {
      $('.label-people', innerCircle).show();
    });
  } else {
    innerCircle.css(newCSS);
    $('.label-people', innerCircle).show();
  }
}


/**
 * sonar Module
 */
 var sonar = angular.module('sonar', []);
 sonar.controller('ZoneCtrl', function($scope) {
   $scope.zones = [
     {
       id: 'lobby',
       name: 'Lobby',
       occupancy: 19,
       capacity: 50,
       photo: 'https://static1.squarespace.com/static/5166f76be4b0acbb38a3fe03/t/54bc67afe4b06fad9b9fc62b/1421633457806/'
     },
     {
       id: 'meeting1',
       name: 'Meeting Room 1',
       occupancy: 0,
       capacity: 6,
       photo: 'https://www.officelovin.com/wp-content/uploads/2015/12/we-work-spitalfields-1.jpg'
     },
     {
       id: 'meeting2',
       name: 'Meeting Room 2',
       occupancy: 3,
       capacity: 6,
       photo: 'https://www.officelovin.com/wp-content/uploads/2015/12/we-work-spitalfields-1.jpg'
     }
   ];
   
   var changeScope = function() {
     $scope.zones = [
        {
          id: 'lobby',
          name: 'Lobby',
          occupancy: 30,
          capacity: 50,
          photo: 'images/lobby.jpg'
        },
        {
          id: 'meeting1',
          name: 'Meeting Room 1',
          occupancy: 0,
          capacity: 6,
          photo: 'images/lobby.jpg'
        },
        {
          id: 'meeting2',
          name: 'Meeting Room 2',
          occupancy: 3,
          capacity: 6,
          photo: 'images/lobby.jpg'
        }
      ];
      $scope.$apply();
   }
   
   $scope.$watch('zones', function() {
      console.log('scope changed!');
    });
    
    //setTimeout(function() { changeScope(); }, 1000);
 })
 
 .directive('circle', function($timeout) {

   function link(scope, element, attrs) {
     scope.color = selectColor(colorIndex);
     scope.type = 'normal';
     scope.amountFull = (scope.zone.occupancy / scope.zone.capacity);
     if (scope.amountFull == 0) {
       scope.type = 'empty';
     } 
     colorIndex++;
     placeCircles();
     
     $timeout(function() {
       sizeInnerCircle(scope.zone.id, scope.amountFull);
     });
   }

   return {
     restrict: "E",
     scope: {
       zone: "=",
     },
     link: link,
     templateUrl: 'circle.html'
   }
 });
 
function adjustCircles() {
  $('.circle').each(function() {
    var occupancy = $(this).data('occupancy');
    var capacity = $(this).data('capacity');
    
    var plusOrMinus = Math.random() < 0.5 ? -1 : 1;
    var jitter = 0.6;
    if ($(this).attr('id') == 'lobby') {
      jitter = 3;
    }
    var newOccupancy = occupancy + (plusOrMinus * Math.round(Math.random() * jitter));
    if (newOccupancy > capacity) newOccupancy = capacity;
    
    var amountFull = newOccupancy / capacity;
    $('.num-people', $(this)).html(newOccupancy);
    sizeInnerCircle($(this).attr('id'), amountFull);
  });
}

setInterval(function() { adjustCircles(); }, 1000);