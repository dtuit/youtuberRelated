app.controller('visGraphCtrl', ['$scope', '$window', 'visGraphDataService', function ($scope, $window, visGraphDataService) {
  
  $scope.nodes = new vis.DataSet([{}])
  $scope.edges = new vis.DataSet([{}])
  var get = function () {
    visGraphDataService.get().then(function (promise) {
      if (angular.isDefined(promise.error) && promise.error === 0) {
        $scope.graph = { error: promise.error, data: { nodes: promise.nodes, edges: promise.edges }, options: promise.options };
      }
    }, function (promise) {
      console.error('visGraphDataService.promise.error', promise);
    });
  };

  $scope.callbackFunction = function (params) {
    $window.alert(angular.toJson(params));
  };
  
  $scope.addNode = function(id, label){
    $scope.graph.data.nodes.add({id : id, label : label})
  }
  
  get();

}]);