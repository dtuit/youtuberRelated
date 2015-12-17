(function(){
	app.factory('ytGraphDataService', ytGraphDataService)
	
	ytGraphDataService.$inject = ["ytVisJSGraphService", 'ytDataService'];
	function ytGraphDataService(ytVisJSGraphService, ytDataService){
		return {
			exploreNodes : exploreNodes
		}
		
		// Given a list of channelIds get detailed data and add to the network the nodes and edges
		function exploreNodes(channelIds){
			
			//For each chunk of 50 channelIds, (50 because youtube-api-v3 maxResults)
			var chunks = channelIds.chunk(50);
			for(var i = 0; i < chunks.length; i++){
				getData(chunks[i]).then(function(res){
					console.log(res);
				})
			}
		}
		
		function getData(channelIds){
            var defer = $q.defer();
            var nodes = {};
            
            ytDataService.getChannelsBrandingSettings(channelIds).then(function(channelResults){

				var channelTrailerVideoIds = [];
				// var linkedItems = [];
						
                for (var i = 0; i < channelResults.length; i++) { var cur = channelResults[i];
                    var n = createNode(cur);
					nodes[n.id] = n;
					
					// the set of videoIds to used to determine the "category" of the youtuber.
					channelTrailerVideoIds.push(cur.brandingSettings.channel.unsubscribedTrailer);
					// the channels that are linked
					// linkedItems.push.apply(linkedItems, cur.brandingSettings.channel.featuredChannelsUrls);
				}    
                
                return ytDataService.getChannelChannelTrailerCategory(channelTrailerVideoIds);
            }).then(function(videoResults){
                
				for(var i = 0; i < videoResults.length; i++){ 
					var video = videoResults[i]
					nodes[video.snippet.channelId].categoryId = video.snippet.categoryId;
				}
				
                defer.resolve(nodes);                
            })
            
            return defer.promise;
        }
		
		function createIntermediaryNode(ytDataItem){
			var node = {
				id : ytDataItem.id,
				data : {
					title : ytDataItem.brandingSettings.channel.title,
					description : ytDataItem.brandingSettings.channel.description,
					thumbnail : ytDataItem.snippet.thumbnails.default.url,
					channelTrailerId : ytDataItem.brandingSettings.channel.unsubscribedTrailer
				},
				links : ytDataItem.brandingSettings.channel.featuredChannelsUrls ? ytDataItem.brandingSettings.channel.featuredChannelsUrls : []
			}
			return node;
		}
		
		function createEdges(){
			
		}
	}
})()