angular.module("common", [])
.directive("dropdown", [
	function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				action: "&",
				items: "=",
				ngModel: "="
			},
			link: function(scope, element, attrs) {
				scope.$watch("items", function() {
					if (angular.isDefined(scope.items)) {
						var index = _.findIndex(scope.items, scope.ngModel);
						if (index === -1 && scope.items.length > 0) {
							scope.pick(scope.items[0]);
						}

						scope.ngModel = scope.ngModel || (scope.items.length > 0 ? scope.items[0] : {});
					}
				});

				scope.pick = function(item) {
					if (angular.isDefined(scope.action)) {
						scope.action({ picked: item });
					}
					scope.ngModel = item;
				}
			},
			templateUrl: "js/common/dropdown.html"
		}
	}
]);