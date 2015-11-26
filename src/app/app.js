var app = angular.module('visApp', ['angular-google-gapi', 'ngVis']);

app.run(['GAuth', 'GApi', function (GAuth, GApi) {
	
	// Initialize Google JS Client Libary and Auth with angular-google-gapi
	var clientId = '139414527821-nopjkt0c1h56mqisrmtkjcenolpi6j2v.apps.googleusercontent.com';
	var apiKey = 'AIzaSyBXspCKR532IXLBi7Vgv_D7o_h4IpG_84A';

	GApi.load('youtube', 'v3');
	GAuth.setScope('https://www.googleapis.com/auth/youtube.readonly')
	GAuth.setClient(clientId);
	GAuth.checkAuth().then(
		function () {
			console.log('logged in')
		},
		function () {
			console.log('not logged in')
		})
}])

// Split an Array into chunks of size n
Object.defineProperty(Array.prototype, 'chunk', {
    value: function (chunkSize) {
        var R = [];
        for (var i = 0; i < this.length; i += chunkSize)
            R.push(this.slice(i, i + chunkSize));
        return R;
    }
});