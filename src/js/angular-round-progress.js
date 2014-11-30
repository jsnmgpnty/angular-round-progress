// I could've used angular-svg-round-progressbar but decided to try creating 
// my own just for giggles. Although the animation stutters :(
var angularRoundProgressBar = angular.module("angularRoundProgressBar", []);

angularRoundProgressBar.directive('roundProgressBar', ["$interval", "$timeout", function($interval, $timeout) {
	// this should be on a provider that will be set on module initialization..but meh~
	var defaults = {
		thickness : 20,
		size : 240,
		baseColor : '#5cb85c',
		dangerColor: '#d9534f',
		warningColor: '#f0ad4e',
		dangerLevel: 50,
		warningLevel: 74
	};
	
	// html template for the progress thingy
	var template = 
		'<div class="round-progress-container">' +
			'<canvas id="round-progress-bar" width="{{size}}" height="{{size}}"></canvas>' +
			'<div class="progress-display center-absolute">' + 
				'<label>{{progressValue}}</label>' +
				'<span class="center-absolute">%</span>' +
			'</div>' +
		'</div>';
	
	// controller function for the directive
	var ctrlFn = function($scope) {
		// triggers when someone broadcasts or emit 'setProgressBarValue' topic
		$scope.$on("setProgressBarValue", function(event, progressValue) {
			$scope.setProgressBarValue(progressValue);	
		});
	};
	ctrlFn.$inject = ["$scope"];
	
	return {
		controller: ctrlFn,
		scope: { currentValue: '=' },
		replace: true,
		template: template,
		link: function(scope, el, attrs) {
			// get values passed to attributes
			scope.thickness = parseInt(!attrs.thickness ? defaults.thickness : attrs.thickness);
			scope.size = parseInt(!attrs.size ? defaults.size : attrs.size);
			scope.baseColor = !attrs.baseColor ? defaults.baseColor : attrs.baseColor;
			scope.warningColor = !attrs.warningColor ? defaults.warningColor : attrs.warningColor;
			scope.dangerColor = !attrs.dangerColor ? defaults.dangerColor : attrs.dangerColor;
			scope.dangerLevel = parseInt(!attrs.dangerLevel ? defaults.dangerLevel : attrs.dangerLevel);
			scope.warningLevel = parseInt(!attrs.warningLevel ? defaults.warningLevel : attrs.warningLevel);
			scope.progressValue = 0;
			
			// initializing canvas
			var canvas = $(el).find("#round-progress-bar")[0];
			var ctx = canvas.getContext('2d');
			
			// circle properties
			var circ = Math.PI * 2;
			var quart = Math.PI / 2;
			
			// method to get the color of the progress bar
			var getProgressBarColor = function () {
				return scope.progressValue < scope.dangerLevel ? 
					scope.dangerColor : (scope.progressValue < scope.warningLevel ? 
						scope.warningColor : scope.baseColor);
			};
			
			var imageData = ctx.getImageData(0, 0, scope.size, scope.size);
			
			
			var drawProgressBar = function () {
				// draw the progress moving thingy
				ctx.beginPath();
				ctx.strokeStyle = getProgressBarColor();
				ctx.lineCap = 'square';
				ctx.closePath();
				ctx.fill();
				ctx.lineWidth = scope.thickness;
				//ctx.putImageData(imageData, 0, 0);
				ctx.beginPath();
				
				var arcSize = scope.size / 2;
				ctx.arc(arcSize, arcSize, arcSize - 50, -(quart), ((circ) * (scope.progressValue / 100)) - quart, false);
				ctx.stroke();
				
				$(el).find('label').css({
					'font-size': (arcSize - 50) + 'px'
				});
				$(el).find('span').css({
					'font-size': ((arcSize - 50) / 3) + 'px',
					'margin-top': ((arcSize - 50) + 5) + 'px'
				});
			};
			
			// draws the basic layout for the progress bar
			var drawBaseLayout = function () {
				// set canvas size for drawing
				canvas.width = scope.size;
				canvas.height = scope.size;
				
				// draw the circular thingy
				ctx.beginPath();
				ctx.strokeStyle = '#ccc';
				ctx.lineCap = 'square';
				ctx.closePath();
				ctx.fill();
				ctx.lineWidth = scope.thickness;
				
				var arcSize = scope.size / 2;
				ctx.arc(arcSize, arcSize, arcSize - 50, -(quart), circ - quart, false);
				ctx.stroke();
			};
			
			var animateProgressDraw = function () {
				// delay animation by 0.5s to allow the ng-enter animation to finish
				$timeout(function () {
					// clear canvas for redrawing
					ctx.clearRect (0 , 0 , canvas.width, canvas.height);
					drawBaseLayout();
					
					var stop;
					stop = $interval(function () {
						// draw the new circle data
						drawProgressBar();
						
						// stop animation when counter reaches the value passed to the directive
						if (scope.progressValue >= scope.currentValue) {
							$interval.cancel(stop);
							stop = undefined;
						} else {
							scope.progressValue++;
						}
					}, 10);
				}, 500);
			};
			
			// the animation for the progress bar.
			scope.setProgressBarValue = function (value) {
				// validate if value passed is a number or if not within 0 to 100 range
				if(isNaN(value) || value < 0 || value > 100) return;
				
				// set progress bar initial and final values
				scope.progressValue = 0;
				scope.currentValue = value;
				animateProgressDraw();
			};
			
			scope.setProgressBarValue(scope.currentValue);
		}
	};
}]);