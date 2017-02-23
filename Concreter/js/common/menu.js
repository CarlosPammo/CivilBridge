angular.module("menu", [])
.directive("topMenu", ["$location", "$window",
	function ($location, $window) {
		return {
			retrict: "E",
			replace: true,
			scope: false,
			link: function (scope, element, attrs) {
				scope.loadPage = function(ref) {
					$location.$$search = {};
					$location.path(ref);
				}

				scope.isActive = function (path) {
					var current = $window.location.hash;
					return current.toLowerCase() === path;
				};
			},
			templateUrl: "js/common/menu.html"
		};
	}
])