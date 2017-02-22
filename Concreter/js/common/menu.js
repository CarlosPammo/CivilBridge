angular.module("menu", [])
.directive("topMenu", ["$location", 
	function ($location) {
		return {
			retrict: "E",
			replace: true,
			scope: false,
			link: function (scope, element, attrs) {
				scope.loadPage = function(ref) {
					$location.$$search = {};
					$location.path(ref);
				}
			},
			templateUrl: "js/common/menu.html"
		};
	}
])