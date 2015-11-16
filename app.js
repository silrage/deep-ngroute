angular.module('app', ['ngRoute'])

    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'home.html',
      controller: DashboardCtrl,
      resolve: {
        hasSidebar: function($rootScope) {
          $rootScope.hasSidebar = false;
          return false; }
      }
    })
    .when('/header1', {
        templateUrl: 'header1.html',
        controller: DashboardCtrl,
        resolve: {
          hasSidebar: function($rootScope) {
              $rootScope.hasSidebar = false;
              return false; }
        }
    })
    .when('/header2', {
        templateUrl: 'header2.html',
        controller: DashboardCtrl,
        resolve: {
          hasSidebar: function($rootScope) {
              $rootScope.hasSidebar = false;
              return false; }
        }
    })
    .when('/dashboard',{
        templateUrl: 'dashboard.html',
        controller: DashboardCtrl,
        resolve: {
          hasSidebar: function($rootScope) {
              $rootScope.hasSidebar = true;
              return true; }
        }
    })
    .when('/sidebar1',{
        templateUrl: 'sidebarlink1.html',
        controller: DashboardCtrl,
        resolve: {
          hasSidebar: function($rootScope) {
              $rootScope.hasSidebar = true;
              return true; }
        }
    })
    .when('/sidebar2',{
        templateUrl: 'sidebarlink2.html',
        controller: DashboardCtrl,
        resolve: {
          hasSidebar: function($rootScope) {
              $rootScope.hasSidebar = true;
              return true; }
        }
    })
    .when('/sidebar2/link',{
        templateUrl: 'sidebarlink3.html',
        controller: DashboardCtrl,
        resolve: {
          hasSidebar: function($rootScope) {
              $rootScope.hasSidebar = true;
              return true; }
        }
    })
    .otherwise({
        redirectTo: '/'
    });
    $locationProvider.html5Mode({
      enabled: true,
      // requireBase: false
    });
}]);

function DashboardCtrl() {
//	You code here..
}
