'use strict';

var angular = require('angular'); // That's right! We can just require angular as if we were in node 

// Application
var app = angular.module('App', [ require ('angular-route') , require ('angular-bootstrap-npm'), require('angular-animate')]);

// Controllers
var HomeCtrl = require('./controllers/HomeCtrl'); 
var ArticleCtrl = require('./controllers/ArticleCtrl'); 
var SocietyCtrl = require('./controllers/SocietyCtrl');
var MediaCtrl = require('./controllers/MediaCtrl');
var FormCtrl = require('./controllers/FormCtrl'); 
var LinkCtrl = require('./controllers/LinkCtrl'); 
var CarrouselCtrl = require('./controllers/CarrouselCtrl'); 
var MenuCtrl = require('./controllers/MenuCtrl'); 
  
// Directives
var CarrouselDir = require('./directives/CarrouselDir'); 
var MenuDir = require('./directives/MenuDir'); 
var FooterDir = require('./directives/FooterDir');
var AgendaDir = require('./directives/AgendaDir');
var LoadingDir = require('./directives/LoadingDir'); 

// Router
var Router = require('./Router'); 

// Service
var $socketProvider = require('./services/SocketProvider'); 

// Binding 
app.controller('HomeCtrl', ['$scope', HomeCtrl]);
app.controller('ArticleCtrl', ['$scope', ArticleCtrl]);
app.controller('SocietyCtrl', ['$scope', SocietyCtrl]);
app.controller('MediaCtrl', ['$scope', MediaCtrl]);
app.controller('FormCtrl', ['$scope', FormCtrl]);
app.controller('LinkCtrl', ['$scope', LinkCtrl]);
app.controller('CarrouselCtrl', ['$scope','$interval', '$window', CarrouselCtrl]);
app.controller('MenuCtrl', ['$scope','$socket', MenuCtrl]);

app.directive('myCarrousel',  CarrouselDir);
app.directive('myMenu', MenuDir);
app.directive('myFooter', FooterDir);
app.directive('myAgenda', AgendaDir);
app.directive('myLoading', LoadingDir);

app.provider('$socket', $socketProvider);

// Config
app.config(['$routeProvider',Router]);
app.config(function ($socketProvider) {
    $socketProvider.setConnectionUrl('http://localhost:8080');
});



