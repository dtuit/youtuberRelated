app.controller('visMainCtrl', ['$scope', 'VisDataSet',function($scope, VisDataSet) {
    $scope.events = {};
    
    $scope.options = {
      autoResize: true,
      height: '800',
      width: '100%'
    };
    
    $scope.nodes = new vis.DataSet();
    $scope.edges = new vis.DataSet();
    
    $scope.nodes.add([
        {id : 1, label : "item 1"},
        {id : 2, label : "item 2"}
    ]);
    
    $scope.edges.add([
        {from: 1, to: 2}
    ])
        
    $scope.options = {
      autoResize: true,
      height: '800',
      width: '100%'
    };
    
    $scope.data = {nodes : $scope.nodes, edges : $scope.edges, options : $scope.options}
    
    $scope.addNode = function(id, label){
        $scope.nodes.add({id : 3, label : label})
        $scope.edges.add({from: 3, to : 2})
    }
  }
]);