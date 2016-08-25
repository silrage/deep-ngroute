'use strict';

var app = angular.module('app', ['ngRoute']);
// var links;
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    //Parse all menuitems
    // links = JSON.parse( angular.element( document.querySelector('#mainMenu') )[0].innerHTML );
      angular.forEach(links, function(link){
        var rule = {
          template: link.template,
        };
        if(link.controller) {
          rule.controller = function( $scope, $rootScope, $http ) {
            eval( link.controller );
          }
        }
        if(link.sidebar) {
          rule.resolve = {
            hasSidebar: function($rootScope) {
              $rootScope.hasSidebar = true;
              return true; 
            }
          }
        }else{
          rule.resolve = {
            hasSidebar: function($rootScope) {
              $rootScope.hasSidebar = false;
              return false; 
            }
          }
        }

        $routeProvider
          .when(link.url, rule)
          .otherwise({
              redirectTo: '/'
          });
      });
    
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
}]);


app.directive("menuTop", function(){
  return {
    restrict: 'E',
    template: menuTop_template,
    link: null,
    controller: getUP
  }
});
app.directive("menuLeft", function(){
  return {
    restrict: 'E',
    template: menuLeft_template,
    link: null,
  }
});
function getUP($scope, $http, $route) {
  $scope.AddNewMenuItem = function() {
    $http({
      url: 'up.php',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: function(obj) {
        var str = [];
        for (var p in obj)
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        return str.join('&');
      },
      method: 'POST',
      data: {
        add: true
      }
    }).then(function(resp){
      if(resp.status === 200) {
        //Update current scope
        links = resp.data;
        return window.location.reload();
      }
    })
  }
  $scope.cleanMenu = function() {
    $http({
      url: 'up.php',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      transformRequest: function(obj) {
        var str = [];
        for (var p in obj)
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        return str.join('&');
      },
      method: 'POST',
      data: {
        clean: true
      }
    }).then(function(resp){
      if(resp.status === 200) {
        //Update current scope
        links = resp.data;
        return window.location.reload();
      }
    })
  }
}
function menuTop_template() {
  //Parse all menuitems
  var out = '<div id="header" class="menu-top"><span class="title">Header</span><br/>';
  angular.forEach(links, function(v){
    //Detect home link
    if(v.url == '/') {
      var home = angular.element( document.querySelector('base') )[0].href;
      var link = home;
    }else{
      //For set link url need splice "/" symbol when exist
      var link = ( v.url.indexOf('/') === 0) ? v.url.slice(1, v.url.length) : v.url;
    }
    //Set menu items with key menu value = top
    if(v.name != undefined && v.menu == 'top') {
      out += '<a href="'+link+'">';
      out +=    v.name;
      out += '</a>';
    }
  })
  out += '<a ng-click="AddNewMenuItem()">+Add</a> <a ng-click="cleanMenu()">-Clean</a></div>';
  return out;
}
function menuLeft_template() {
  //Parse all menuitems
  var out = '<div class="menu-left"><span class="title">Sidebar</span><br/>';
  angular.forEach(links, function(v){
    //Detect home link
    if(v.url == '/') {
      var home = angular.element( document.querySelector('base') )[0].href;
      var link = home;
    }else{
      //For set link url need splice "/" symbol when exist
      var link = ( v.url.indexOf('/') === 0) ? v.url.slice(1, v.url.length) : v.url;
    }
    //Set menu items with key menu value = top
    if(v.name != undefined && v.menu == 'left') {
      out += '<a href="'+link+'">';
      out +=    v.name;
      out += '</a>';
    }
  })
  out += '</div>';
  return out;
}
// app.controller("DashboardCtrl", function ($scope) {
//   console.log('dashboard:init');
// })
