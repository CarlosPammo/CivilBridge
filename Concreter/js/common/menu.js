angular.module("menu", [])
.directive("topMenu", [
	function() {
		return {
			retrict: "E",
			replace: true,
			scope: false,
			link: function(scope, element, attrs) {
				
			},
			templateUrl: "js/common/menu.html"
		};
	}
])