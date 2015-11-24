app.controller('visAppCtrl', function($scope, GApi, GAuth, $rootScope){
	window.MYSCOPE = $scope;
	window.GAPI = GApi;
	
	$scope.subscriptions = []
	$scope.channelBrandingSettings = [];
	
	$scope.authorize = function(){
		GAuth.login().then(
			function(){
			console.log('logged in');
			console.log($rootScope.gapi.user);
			},
			function(){
				console.log('not logged in')
			})
	}
	

	function requestSubscriptionsList(pageToken, channelId) {
		var requestParams = {
			maxResults: 50,
			part: "snippet",
			fields: "nextPageToken,pageInfo,items/snippet(title,resourceId/channelId,thumbnails)"
		}
		if (pageToken) requestParams.pageToken = pageToken;
		if (channelId) requestParams.
			else
		requestParams.mine = true;
		
		return GApi.execute('youtube', 'subscriptions.list', requestParams)
	}
	
	$scope.getUsersSubscriptions = function(){
		
		var subscriptions = []
		
		function extractSubscriptionsSuccess(res){
			console.log(res)
			angular.forEach(res.items, function(item){
				subscriptions.push(item)
			})
			if(res.nextPageToken){
				requestSubscriptionsList(res.nextPageToken).then(extractSubscriptionsSuccess,extractSubscriptionsFail)
			}
		}
		function extractSubscriptionsFail(res){
			console.log(res)
		}
		
		requestSubscriptionsList().then(extractSubscriptionsSuccess,extractSubscriptionsFail)
		
		$scope.subscriptions = subscriptions;
		// GApi.execute('youtube', 'subscriptions.list', {part : "snippet", mine : "true"}).then(function(x){console.log(x)})
	}
	
	function requestChannelsList(channelIds){
		var requestParams = {
			part : "brandingSettings",
			id : channelIds
		}
		return GApi.execute('youtube', 'channels.list', requestParams)
	}
	
	$scope.getChannelsBrandingSettings = function(channelIds){
		
		var channelsBrandingSettings = []
		
		function success(res){
			console.log(res)
			angular.forEach(res.items, function(item){
				channelsBrandingSettings.push(item);
			})
		}
		function fail(res){
			console.log(res)
		}
		var chunks = channelIds.chunk(50);
		for(var i = 0; i < chunks.length; i++){
			var c = chunks[i].map(function(elm){return elm.snippet.resourceId.channelId});
			console.log(c)
			requestChannelsList(c.join()).then(success, fail);
		}

		$scope.channelBrandingSettings = channelsBrandingSettings;
	}
	
	

})