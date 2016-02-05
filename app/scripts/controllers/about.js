'use strict';

/**
 * @ngdoc function
 * @name crescendoApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crescendoApp
 */
angular.module('crescendoApp')
  .controller('AboutCtrl', function ($scope, $log, DB_URL, $firebaseArray, $location)
  {

  $scope.listing;
    $scope.loc = {};
  $scope.update = function(listing){
  	$scope.listing = listing;
  	$log.info($scope.listing);
  	var point = codeAddress($scope.listing.address);
  	$log.info($scope.loc.lng);
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
  			//$log.info(results);
  			//$log.info(point);
  			//$log.info(point.loc.lat());
            $scope.loc.lat = point.loc.lat();
            $scope.loc.lng = point.loc.lng();
            $log.info($scope.loc);
            $scope.listing.lat = $scope.loc.lat;
  			$log.info($scope.listing);
            $log.info($scope.loc.lng);
            $scope.listing.long = $scope.loc.lng;
  			$log.info($scope.listing);

            //get listings from firebase
            var ref = new Firebase(DB_URL + "/listings");
            var listings = $firebaseArray(ref);

            //wait till get is done
            listings.$loaded().then(function(){
                $log.info(listings);
                listings.$add({
                    name: $scope.listing.name,
                    desc: $scope.listing.desc,
                    long: $scope.listing.long,
                    lat: $scope.listing.lat
                }).then(function(ref){
                    $log.info("works");
                    $location.path("/#/");
                });
            });
  		} 
	});
    //$log.info(point);
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

