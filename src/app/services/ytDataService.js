(function () {
	app.factory("ytDataService", ytDataService);

	ytDataService.$inject = ['GApi', '$q', 'ytMapDataService']
	function ytDataService(GApi, $q, ytMapDataService) {
		return {
			requestSubscriptionsList: requestSubscriptionsList,
			requestChannelsList: requestChannelsList,
			requestVideosList : requestVideosList,
			requestSearchList : requestSearchList,
			
			getChannelSearchResults : getChannelSearchResults,
			getAllSubscriptions: getAllSubscriptions,
			getChannelsBrandingSettings: getChannelsBrandingSettings,
			getChannelChannelTrailerCategory : getChannelChannelTrailerCategory
		}

		function requestChannelsList(requestParams) {
			return GApi.execute('youtube', 'channels.list', requestParams)
		}

		function requestSubscriptionsList(requestParams) {
			return GApi.execute('youtube', 'subscriptions.list', requestParams)
		}
		
		function requestVideosList(requestParams){
			return GApi.execute('youtube', 'videos.list', requestParams)
		}
		
		function requestSearchList(requestParams){
			return GApi.execute('youtube', 'search.list', requestParams)
		}
		
		function getChannelSearchResults(query, pageToken){

			var requestParms = {
				maxResults : 15,
				part : "snippet",
				type : "channel",
				q : query
			}
			if(pageToken) requestParms.pageToken = pageToken;
					
			return requestSearchList(requestParms)
		}
		
		function getAllSubscriptions() {
			var defer = $q.defer();
			var requestParams = {
				mine: true,
				maxResults: 50,
				part: "snippet"
				// fields: "nextPageToken,pageInfo,items/snippet(title,resourceId/channelId,thumbnails)"
			}
			var results = [];
			requestSubscriptionsList(requestParams).then(success, error);
			
			function success(res){
				results.push.apply(results, res.items)
				if(res.nextPageToken){
					requestParams.pageToken = res.nextPageToken
					requestSubscriptionsList(requestParams).then(success,error);
				}else{
					defer.resolve(results);
				}
			}
			function error(er){
				console.log(er)
			}
			
			return defer.promise;
		}
		
		function getChannelChannelTrailerCategory(videoIds){
			var defer = $q.defer();
			var promises = [];
			var requestParams = {
				part : "snippet"
				// fields : ""
			}
			
			var chunks = videoIds.chunk(50);
			for(var i = 0; i < chunks.length; i++){
				var cids = chunks[i].join();
				requestParams.id = cids;
				promises.push(requestVideosList(requestParams))
			}
			
			$q.all(promises).then(
				function(values){
					
					var results = values.reduce(function(prev, cur){
						return {items: prev.items.concat(cur.items) }
					}).items;
					
					defer.resolve(results);
				}
			)
			return defer.promise;
		}
		
		function getChannelsBrandingSettings(channelIds) {
			var defer = $q.defer();
			var promises = [];
			var requestParams = {
				part: "snippet,brandingSettings",
				// fields : ""
			}

			var chunks = channelIds.chunk(50);
			for (var i = 0; i < chunks.length; i++) {
				var cids = chunks[i].join();
				requestParams.id = cids;
				promises.push(requestChannelsList(requestParams))
			}
			
			$q.all(promises).then(
				function (values) {
					
					var results = values.reduce(function (prev, cur) {
						return { items: prev.items.concat(cur.items) };
					}).items
					
					defer.resolve(results);
					
				}, function (error) {
					console.log(error);
				})

			return defer.promise;
		}
	}
})();