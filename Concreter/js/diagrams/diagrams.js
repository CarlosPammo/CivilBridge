angular.module("diagrams", [])
.directive("variabilityCharts", ["d3", 
	function (d3) {
		return {
			replace: true,
			scope: {},
			link: function(scope, element, attrs) {
				var margin = { top: 30, right: 20, bottom: 30, left: 50 };
				var width = 400 - margin.left - margin.right;
				var height = 220 - margin.top - margin.bottom;

				var parseDate = d3.time.format("%d-%b-%y").parse;

				var x = d3.time.scale().range([0, width]);
				var y = d3.scale.linear().range([height, 0]);

				var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5);
				var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

				var valueline = d3.svg.line()
					.x(function(d) {
						return x(d.date);
					}).y(function(d) {
						return y(d.close);
					});

				var chart = d3.select("#area1")
					.append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
					.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.right + ")");

				d3.csv("js/diagrams/data-1.csv", function (error, data) {
					data.forEach(function(d) {
						d.date = parseDate(d.date);
						d.close = +d.close;
					});

					x.domain(d3.extent(data, function(d) {
						return d.date;
					}));

					y.domain([
						0, d3.max(data, function(d) {
							return d.close;
						})
					]);

					chart.append("path")
						.attr("class", "line")
						.attr("d", valueline(data));

					chart.append("g")
						.attr("class", "x axis")
						.attr("transform", "translate(0, " + height + ")")
						.call(xAxis);

					chart.append("g")
						.attr("class", "y axis")
						.call(yAxis);
				});
			},
			templateUrl: "js/diagrams/variability.html"
		}
	}
]);