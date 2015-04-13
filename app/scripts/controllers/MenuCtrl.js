'use strict';

var MenuCtrl = function($scope,$socket) {

	$scope.menu = [
		{"title":"Accueil","route":"#/accueil","sub":[]},
		{"title":"Présentation","route":"#/article/presentation","sub":[]},
		{"title":"Historique","route":"#/article/historique","sub":[]},
		{"title":"Le Groupe","route":"#/article/legroupe","sub":[
			{"title":"Les Adultes","route":"#/article/lesadultes"},
			{"title":"Les Jeunes","route":"#/article/lesjeunes"},
			{"title":"Les Enfants","route":"#/article/lesenfants"}
		]}
	]

	$socket.on('get-menu', function (data) {
    	//$scope.menu = data;
	});
	$scope.emit = function () {
        $socket.emit('request-menu', '');
    };
    $scope.set_buttonClass = function(subExist) {
    	if (subExist){
    		return 'dropdown';
    	}
    	else{
    		return '';
    	}
    };

};

module.exports = MenuCtrl;