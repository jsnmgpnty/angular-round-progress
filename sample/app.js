var sample = angular.module("sample", ["angularRoundProgressBar"]);

sample.controller('sampleController', ["$scope", "$rootScope", "$timeout", function($scope, $rootScope, $timeout) {
	$scope.range = 50;
	
	$scope.rangeUpdate = function () {
		$timeout(function () {
			$rootScope.$broadcast("setProgressBarValue", $scope.range);
		}, 200);
	};
}]);