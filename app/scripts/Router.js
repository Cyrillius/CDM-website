  'use strict';

  var Router = function($routeProvider) {
      $routeProvider.
      // Home page
      when('/accueil', {
        templateUrl: './templates/home.html',
        controller: 'HomeCtrl'
      }).
      // Article page
      when('/article/:name', {
        templateUrl: './templates/article.html',
        controller: 'ArticleCtrl'
      }).
      // Society page
      when('/societe/:type', {
        templateUrl: './templates/society.html',
        controller: 'SocietyCtrl'
      }). 
      // Media page
      when('/media/:type', {
        templateUrl: './templates/media.html',
        controller: 'MediaCtrl'
      }). 
      // Form page
      when('/form/:id', {
        templateUrl: './templates/form.html',
        controller: 'FormCtrl'
      }). 
      // Link page
      when('/link', {
        templateUrl: './templates/link.html',
        controller: 'LinkCtrl'
      }).           
      // Default page    
      otherwise({
        redirectTo: '/accueil'
      });
  };

  module.exports = Router;