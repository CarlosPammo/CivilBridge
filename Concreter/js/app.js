"use-strict";
angular.module("ngD3", []).value("d3", d3);
angular.module("App", [
	//bower modules
	"angular-confirm",
	"ngAnimate",
	"ngCookies",
	"ngD3",
	"ngMaterial",
	"ngResource",
	"ngRoute",
	"ngSanitize",
	"ui.bootstrap",
	"ui.router",
	//app modules,
	"common",
	"diagrams",
	"menu"
]).controller("AppCtrl", ["$scope", "$location",
	function($scope, $location) {
		$scope.current = null;

		$location.path("/diagrams");
	}
])
.config(["$routeProvider", "$httpProvider", "$stateProvider", "$urlRouterProvider",
	function ($routeProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
		$httpProvider.interceptors.push("responseInterceptor");

		$stateProvider
			.state("home", {
				url: "/home",
				templateUrl: "js/home/home.html"
			}).state("diagrams", {
				url: "/diagrams",
				templateUrl: "js/diagrams/diagrams.html"
			});

		$urlRouterProvider.otherwise("/home");
	}
])
.factory("responseInterceptor", ["$q", function ($q) {
		return {
			"responseError": function (content) {
				if (content.status === 401) {
					// non login user
				} else if ((content.status === 500) && _.isObject(content.data)) {
					// Exception
				}
				return $q.reject(content);
			}
		};
	}
]);