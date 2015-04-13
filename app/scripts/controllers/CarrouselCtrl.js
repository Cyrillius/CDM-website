'use strict';

var CarrouselCtrl = function($scope, $interval, $window) {
 	$scope.slideInterval = 5000;
  	$scope.slides = [	{"name": "slide 1", "url": "./images/carrousel/slide1.jpg"},
  				   		{"name": "slide 2", "url": "./images/carrousel/slide2.jpg"},
                {"name": "slide 3", "url": "./images/carrousel/slide3.jpg"},
                {"name": "slide 4", "url": "./images/carrousel/slide4.jpg"}
  	];

  	$scope.currentIndex = 2;

  	var timer;

  	$scope.start = function(){
  		//don't restart if it's already started
  		if(angular.isDefined(timer)) return;

  		timer = $interval(function() {
            if ($scope.currentIndex < $scope.slides.length - 1) {
              $scope.currentIndex ++;
            } else {
              $scope.currentIndex = 0;
            }
            $scope.currentPicture = $scope.slides[$scope.currentIndex].url;
        }, $scope.slideInterval );

      //$scope.backStyle = "url(" + $scope.slides[$scope.currentIndex].url+ ") no-repeat center fixed "; 
      $scope.currentPicture = $scope.slides[$scope.currentIndex].url; 
  	};

    $scope.setCurrentSlideIndex = function (index) {
        $scope.currentIndex = index;

    };

    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };


};

module.exports = CarrouselCtrl;