'use strict';

/**
 * @ngdoc function
 * @name crescendoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crescendoApp
 */
angular.module('crescendoApp')
  .controller('AboutCtrl', function ($scope, $log, DB_URL, $firebaseArray)
  {

  $scope.listing;
  $scope.update = function(listing){
  	$scope.listing = listing;
  	$log.info($scope.listing);
  	var thing = codeAddress($scope.listing.address);
  	$log.info(thing);
  }

  var geocoder = new google.maps.Geocoder();

  function codeAddress(inputID) {
	//geocodes the string at inputID and returns {loc:latLng(google object), city:str, state:str(full name)} if successful
	//otherwise returns false
	var address = inputID;
	$log.info(address);
	var point = false;
	// alert(inputID.value);
	geocoder.geocode( { 'address': address}, function(results, status) {
  		if (status == google.maps.GeocoderStatus.OK) {
  			// alert("got a valid status from google");
  			// var cityState = getCityState(results);
  			point = {
  				loc: results[0].geometry.location,
  				// city: cityState.city,
  				// state: cityState.state
  			};
  			$log.info(results);
  			$log.info(point);
  			$log.info(point.loc.lat());
  			$log.info(point.loc.lng());
  		} 
	});
	return point;
};
  });



// <div ng-controller="ExampleController">
//   <form novalidate class="simple-form">
//     Name: <input type="text" ng-model="user.name" /><br />
//     E-mail: <input type="email" ng-model="user.email" /><br />
//     Gender: <input type="radio" ng-model="user.gender" value="male" />male
//     <input type="radio" ng-model="user.gender" value="female" />female<br />
//     <input type="button" ng-click="reset()" value="Reset" />
//     <input type="submit" ng-click="update(user)" value="Save" />
//   </form>
//   <pre>user = {{user | json}}</pre>
//   <pre>master = {{master | json}}</pre>
// </div>

// <script>
//   angular.module('crescendoApp', [])
//     .controller('AboutCtrl', ['$scope', function($scope) {
//       $scope.master = {};

//       $scope.update = function(user) {
//         $scope.master = angular.copy(user);
//       };

//       $scope.reset = function() {
//         $scope.user = angular.copy($scope.master);
//       };

//       $scope.reset();
//     }]);
// </script>

