(function () {
	app.controller('ytSearchCtrl', ytSearchCtrl)

	ytSearchCtrl.$inject = ['$scope', 'ytDataService'];
	function ytSearchCtrl($scope, ytDataService) {
		$scope.searchResults = [];
		$scope.searchQuery = "";
		var searchPageToken = ""

		$scope.searchChannels = function () {
			if ($scope.searchQuery) {
				ytDataService.getChannelSearchResults($scope.searchQuery, searchPageToken)
					.then(function (res) {
						$scope.searchResults = res.items;
						searchPageToken = res.nextPageToken;
					})
			} else {
				$scope.searchResults = [];
			}
		}

		$scope.authorize = function () {
			GAuth.login().then(
				function () {
					console.log('logged in');
					console.log($rootScope.gapi.user);
				},
				function () {
					console.log('not logged in')
				})
		}

		$scope.addChannelToVisualization = function () {

		}
	}


})()