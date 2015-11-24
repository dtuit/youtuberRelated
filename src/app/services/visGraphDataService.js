app.factory('visGraphDataService', ['$q', '$http', function ($q, $http) {
  return {
    get: function (method, url) {
      var deferred = $q.defer();
      $http.get('data.json')
        .success(function (response) {
          deferred.resolve(response);
        })
        .error(function () {
          deferred.reject("Error! @app.appService");
        });
      return deferred.promise;
    }
  };
}]);