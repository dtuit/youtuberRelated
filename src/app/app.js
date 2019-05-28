var app  = angular.module('visApp', ['angular-google-gapi', 'angular.visgraph', 'ngVis']);

app.run(['GAuth', 'GApi', function(GAuth, GApi){
	
	var clientId = 'CLIENT_ID';
	var apiKey = 'API_KEY';
	
	GApi.load('youtube', 'v3');
	GAuth.setScope('https://www.googleapis.com/auth/youtube.readonly')
	GAuth.setClient(clientId);
	GAuth.checkAuth().then(
		function(){
			console.log('logged in')
		},
		function(){
			console.log('not logged in')
		}
	)
}])


// Split an Array into chunks of size n
Object.defineProperty(Array.prototype, 'chunk', {
    value: function(chunkSize) {
        var R = [];
        for (var i=0; i<this.length; i+=chunkSize)
            R.push(this.slice(i,i+chunkSize));
        return R;
    }
});
