var app = angular.module('myApp', ['ngRoute']);

///////////////////////////////////////////////////////////////////////
/////////////////// NOTE: Routes Controller///////////////////////
/////////////////////////////////////////////////////////////////////

app.controller('RouteController', ['$http', '$scope', '$route', '$routeParams', '$location',
function($http, $scope, $route, $routeParams, $location) {
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
}]);

app.config(['$routeProvider','$locationProvider',
function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.
  when('/articles', {
    templateUrl:'/templates/index.html',
    controller: 'ArticlesController',
    controllerAs: 'articleCtrl'
  }).
  when('/articles/new', {
    templateUrl: '/templates/new.html',
    controller: 'ArticlesController',
    controllerAs: 'articleCtrl'
  }).
  when('/articles/:id', {
    templateUrl: 'articlesNew.html',
    controller: 'ArticlesController',
    controllerAs: 'articleCtrl'
  });
}]);

///////////////////////////////////////////////////////////////////////
/////////////////// NOTE: Session Controller///////////////////////
/////////////////////////////////////////////////////////////////////

app.controller('SessionController', ['$http', '$scope', '$location', '$window',
function($http, $scope, $location, $window) {
  var controller = this;

  $http.get('/amiloggedin').success(function (data){
    controller.current_user = data;
  });

  this.deleteSession = function () {

    $http.delete('/session', {
    }).success(function(data){
      $window.location.href = "/";
    })
  }
}])
///////////////////////////////////////////////////////////////////////
/////////////////// NOTE: Articles Controller///////////////////////
/////////////////////////////////////////////////////////////////////
app.controller('ArticlesController', ['$http', '$scope', '$location', function($http, $scope, $location) {
  var controller = this;

  /// Get Current User from /amiloggedin
  $http.get('/amiloggedin').success(function (data){
    controller.current_user = data;
  });

  //// Get articles
  this.getArticles = function () {
    $http.get('/articles/all_articles').success(function(data) {
      controller.articles = data.articles
      controller.user = data.user
    });
  }

  this.createArticle = function () {
    $http.post('/articles', {
      article: {
        title: controller.newArticle.title,
        body: controller.newArticle.body,
        date: controller.newArticle.date
      }
    }).success(function(data){
      controller.newArticle = {};
      $location.path("/articles");
    })
  }

  this.editArticle = function (article) {

    $http.patch('/articles/'+ article.id, {
      article: {
        title: article.title,
        body: article.body,
        date: article.date
      }
    }).success(function(data){
      controller.getArticles();
    });
  }

  this.deleteArticle = function (article) {
    console.log(article)

    $http.delete('/articles/'+ article.id, {

      //include authenticity_token
    }).success(function(data){
      controller.getArticles()
    }).error(function(data, status) {
      controller.getArticles()
    });
  }
  this.getArticles()
}]);

////////////////////////////////////////////////////////////////////
/////////////////// NOTE: Comment Controller///////////////////////
///////////////////////////////////////////////////////////////////

app.controller('CommentsController', ['$http', '$scope', function($http, $scope) {
  var authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  var controller = this;
  var current_user;
  this.createComment = function () {

    $http.post('/articles/'+ $scope.$parent.article.id+'/comments', {
      authenticity_token: authenticity_token,
      comment: {
        body: this.newCommentBody
      }
    }).success(function(data){
      $scope.$parent.articleCtrl.getArticles();

    }).error(function (err){
      console.log("BLANK comment")
    });
  }
}]);
