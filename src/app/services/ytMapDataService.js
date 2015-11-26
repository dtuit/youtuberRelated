	(function(){
		app.factory("ytMapDataService", ytMapDataService)
	
		ytMapDataService.$inject = []
		
		function ytMapDataService(){
			return {
				mapYtDataToNodesAndEdges : mapYtDataToNodesAndEdges
			}
			
			function mapYtDataToNodesAndEdges(items){
				var retval = [];
				for(var i = 0; i < items.length; i++){ var obj = items[i];
					var retItem = {}
					switch (obj.kind) {
						case "youtube#channel":
							retItem.id = obj.id
							
							break;
						case "youtube#subscription":
							break;
							
						default:
							break;
					}
				}
			}
		}
		
	})();
	