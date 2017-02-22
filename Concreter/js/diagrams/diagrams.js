angular.module("diagrams", [])
.controller("DiagramCtrl", ["$scope",
	function ($scope) {
		$scope.concretes = [{ name: "Viacha" }, { name: "Yura" }, { name: "Camba" }];
		$scope.sands = [{ name: "Viloma" }, { name: "Paro" }, { name: "Chapare" }];
		$scope.additives = [{ name: "Sika" }, { name: "Foco" }, { name: "Grace" }];
	}
])
.directive("variabilityCharts", ["d3", 
	function (d3) {
		return {
			replace: true,
			scope: {},
			link: function(scope, element, attrs) {
				var width = 580,
					height = 580,
					dotradius = 2,
					gridSpacing = 5;

				var svg = d3.select("#area").append("svg")
					.attr("width", width)
					.attr("height", height);

				var x = d3.scale.linear().domain([-100, 100]).range([0, width]);
				var y = d3.scale.linear().domain([-100, 100]).range([height, 0]);

				svg.append("path")
					.attr("class", "grid")
					.attr("d", function() {
						var d = "";

						for (var i = gridSpacing; i < width; i += gridSpacing) {
							d += "M" + i + ",0 L" + i + "," + height;
						}

						for (var j = gridSpacing; j < height; j += gridSpacing) {
							d += "M0," + j + " L" + width + "," + j;
						}

						return d;
					});

				// x axis
				svg.append("path")
					.attr("class", "axis")
					.attr("d", "M0, " + height/2 + " L" + width + "," + height/2);

				// y axis
				svg.append("path")
					.attr("class", "axis")
					.attr("d", "M" + width / 2 + ",0 L" + width / 2 + "," + height);

				var itemList = [];
				d3.csv("js/diagrams/data-1.csv", function(error, data) {
					data.forEach(function (d) {
						itemList.push({
							x: d.x,
							y: d.y
						});
					});

					var items = svg.selectAll("g.item").data(itemList).enter().append("g")
					.attr("class", "item");

					items.append("circle")
						.attr("r", dotradius)
						.attr("cx", function (d) {
							return x(d.x);
						})
						.attr("cy", function (d) {
							return y(d.y);
						});
				});
			},
			template: "<div id='area'></div>"
		}
	}
]);