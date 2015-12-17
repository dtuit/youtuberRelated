(function () {
	app.controller('ytSearchCtrl', ytSearchCtrl)

	ytSearchCtrl.$inject = ['$scope', 'ytDataService'];
	function ytSearchCtrl($scope, ytDataService) {
		$scope.searchResults = [];
		$scope.searchQuery = "";
		
		var pageToken = ""

		$scope.searchChannels = function () {
			if ($scope.searchQuery) {
				ytDataService.getChannelSearchResults($scope.searchQuery, pageToken)
					.then(function (res) {
						$scope.searchResults = res.items;
						pageToken = res.nextPageToken;
					})
			}else{
				$scope.searchResults = [];
			}
		}
	}
})()