var links = [
  {
    name: 'Home',
    url: '/',
    controller: DashboardCtrl,
    template: '<h3>Hello world!</h3><i>This is demo ngRoute page</i>',
    menu: 'top',
  },
  {
    name: 'Header',
    url: '/header1',
    controller: DashboardCtrl,
    template: '<div class="box">header menu 1 content - no side bar</div>',
    menu: 'top',
  },
  {
    name: 'Header',
    url: '/header2',
    controller: DashboardCtrl,
    template: '<div class="box">header menu 2 content - no side bar</div>',
    menu: 'top',
  },
  {
    name: 'Dashboard',
    url: '/dashboard',
    controller: DashboardCtrl,
    template: '<div class="box">dashboard</div>',
    sidebar: true,
    menu: 'top',
  },
  {
    name: 'Link with sidebar',
    url: '/link',
    controller: DashboardCtrl,
    template: '<div class="box">Hi, this is a page number two!</div>',
    sidebar: true,
    menu: 'left',
  },
  {
    name: 'Link with sidebar in path',
    url: '/link/path',
    controller: DashboardCtrl,
    template: '<div class="box">sidebar link content - including sidebar!</div>',
    sidebar: true,
    menu: 'left',
  },
  {
    name: 'Link with hash',
    url: '#popup',
    controller: PopupCtrl,
    template: 'Ooopa!',
  }
];

var app = angular.module('app', ['ngRoute'])

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    //Parse all menuitems
    angular.forEach(links, function(link){
      var rule = {
        controller: link.controller,
        template: link.template,
      };
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
  // console.log('init:yes');
  return {
    restrict: 'E',
    template: menuTop_template,
    link: null,
  }
});
app.directive("menuLeft", function(){
  // console.log('init:yes');
  return {
    restrict: 'E',
    template: menuLeft_template,
    link: null,
  }
});

function menuTop_template() {
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
  out += '</div>';
  return out;
}
function menuLeft_template() {
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
function DashboardCtrl() {
//	You code here..
  // console.log(links)
}
function PopupCtrl() {
  console.log('popup:init');
}