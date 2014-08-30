// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
(function (){




var appChallenge = angular.module('challengeApp', ['ionic']);


appChallenge.run(function($ionicPlatform, $rootScope) {
		  
		  $ionicPlatform.ready(function() {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if(window.cordova && window.cordova.plugins.Keyboard) {
			  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if(window.StatusBar) {
			  StatusBar.styleDefault();
			}
		  });

		}
	);


	
appChallenge.controller( 'ShowChallenge', function($scope, $http){
	$scope.player = null;
	$scope.code = 'rIbA0ixS07k';
	$scope.isLoggedIn = false;
	
	
	$scope.init = function(){
			getPlayer(2);
			//console.log($scope.player);
	};
	
	
	$scope.seeNextChallenge = function($index){
		$scope.code = getYouTubeCode($scope.player.challenges[$index].videoUrl);
		
	
	};

	$scope.login = function () {
		if (!window.cordova) {
			var appId = 1513584685529232;
			facebookConnectPlugin.browserInit(appId);
		}
		facebookConnectPlugin.login( ["email"], 
			function (response) { alert(JSON.stringify(response)) },
			function (response) { alert(JSON.stringify(response)) });
	};
	
	$scope.showDialog = function () { 
		facebookConnectPlugin.showDialog( { method: "share", href:"http://www.youtube.com/watch?v=RDGPgZxlxgg" }, 
			function (response) { alert(JSON.stringify(response)) },
			function (response) { alert(JSON.stringify(response)) });
	};
	
   $scope.apiTest = function () { 
		facebookConnectPlugin.api( "me/?fields=id,email", ["user_birthday"],
			function (response) { alert(JSON.stringify(response)) },
			function (response) { alert(JSON.stringify(response)) }); 
	};

   $scope.getAccessToken = function () { 
		facebookConnectPlugin.getAccessToken( 
			function (response) { alert(JSON.stringify(response)) },
			function (response) { alert(JSON.stringify(response)) });
	};
	
	$scope.getStatus = function () { 
		facebookConnectPlugin.getLoginStatus( 
			function (response) { alert(JSON.stringify(response)) },
			function (response) { alert(JSON.stringify(response)) });
	};

   $scope.logout = function () { 
		    facebookConnectPlugin.logout( 
			function (response) { alert(JSON.stringify(response)) },
			function (response) { alert(JSON.stringify(response)) });
	};
	
	 function onGetPlayerSucces(data , status){
		$scope.player = data;
		console.log($scope);
	 }
	 function getPlayer (playerId) { 
		var url = 'http://54.190.34.161/api/user/' + playerId + '.jsonp?callback=JSON_CALLBACK';
		$http.jsonp(url).success( onGetPlayerSucces );
	 };
	 
	function getYouTubeCode(videoUrl){
		
		if (videoUrl == '' || videoUrl == null) return null;
		var video_id = videoUrl.split('v=')[1];
		var ampersandPosition = video_id.indexOf('&');
		if(ampersandPosition != -1) {
		  video_id = video_id.substring(0, ampersandPosition);
		}
		return video_id;
		
	};
	
});

appChallenge.directive('myYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
    link: function (scope) {
         scope.$watch('code', function (newVal) {
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
           }
        });
    }
  };
});


})();	
