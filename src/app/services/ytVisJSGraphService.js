(function(){
	app.factory('ytVisJSGraphService', ytGraphService)
	
	ytGraphService.$inject =['VisDataSet']
	function ytGraphService(VisDataSet){
		return {
			_getNodesDataSet : _getNodesDataSet,
			_getEdgesDataSet : _getEdgesDataSet,
			
			getNetwork : getNetwork,
			addNodes : addNodes,
			addEdges : addEdges
		}
		
		var nodes = new VisDataSet()
		var edges = new VisDataSet()
		var network = {nodes : nodes, edges : edges}
		
		function _getNodesDataSet(){
			return nodes;
		}
		
		function _getEdgesDataSet(){
			return edges;
		}
		
		function getNetwork(){
			return network
		}
			
		function addNodes(nodes){
			nodes.add(nodes)
		}
		
		function addEdges(edges){
			nodes.add(edges)
		}
	}	
})()
