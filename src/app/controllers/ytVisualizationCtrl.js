app.controller("ytVisualizationCtrl", ["$scope", function($scope){
	$scope.graphData = []	
}]);

app.directive("ytVisualization", function(){
	//constants
	var width = 960,
    	height = 500;
	var color = d3.scale.category20();
		
	return {
		restrict : 'E',
		scope: {
			data : "="
		},
		link : function(scope, element, attrs){
		
		var vis = d3.select(element[0])
			.append("svg")
			.attr("width", width)
			.attr("height", height);
		
		var force = d3.layout.force().nodes()
	}
	}

});