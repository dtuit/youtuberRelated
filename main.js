var clientId = 'CLIENT_ID';
var apiKey = 'API_KEY';
var scopes = ['https://www.googleapis.com/auth/plus.me',
	'https://www.googleapis.com/auth/youtube.readonly'];

// Use a button to handle authentication the first time.
function handleClientLoad() {
	gapi.client.setApiKey(apiKey);
	window.setTimeout(checkAuth, 1);
	loadYoutubeApi()
}


//Check if already authorized previously
function checkAuth() {
	gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: true }, handleAuthResult);
}

//Check
function handleAuthClick(event) {
	gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: false }, handleAuthResult);
	return false;
}

function handleAuthResult(authResult) {
	var authorizeButton = document.getElementById('authorize-button');
	if (authResult && !authResult.error) {
		authorizeButton.style.visibility = 'hidden';
		makeApiCall();
	} else {
		authorizeButton.style.visibility = '';
		authorizeButton.onclick = handleAuthClick;
	}
}

function handleStartFetchClick(event) {
}

function loadYoutubeApi() {
	gapi.client.load('youtube', 'v3', onYoutubeApiLoad)
}

function onYoutubeApiLoad() {

	var usersSubscriptions = getUsersSubscriptions();
}

var subscriptions = []

function getUsersSubscriptions() {
	pageToken = null
	requestSubscriptionsList(pageToken).then()
}


function getUsersSubscriptions() {
	var subscriptions = []
	var pageToken = null
	while (pageToken !== null) {
		req = requestSubscriptionsList(pageToken).then(function (res) {
			pageToken = res.data.pageInfo.pageToken;
			for (var i in res.data.items) {
				subscriptions.push(i)
			}
		});
	}
	return subscriptions
}

function requestSubscriptionsList(pageToken, channelId) {
	requestParams = {
		maxResults: 50,
		part: "snippet",
		fields: "nextPageToken,pageInfo,items/snippet(title,resourceId/channelId,thumbnails)"
	}
	if (pageToken) requestParams.pageToken = pageToken;
	if (channelId) requestParams.
        else
	requestParams.mine = true;

	return gapi.client.youtube.list(requestParams);

}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
	gapi.client.load('plus', 'v1', function () {
		var request = gapi.client.plus.people.get({
            'userId': 'me'
		});
		request.execute(function (resp) {
            var heading = document.createElement('h4');
            var image = document.createElement('img');
            image.src = resp.image.url;
            heading.appendChild(image);
            heading.appendChild(document.createTextNode(resp.displayName));

            document.getElementById('content').appendChild(heading);
		});
	});
}
