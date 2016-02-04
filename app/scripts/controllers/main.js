'use strict';

/**
 * @ngdoc function
 * @name crescendoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the crescendoApp
 */
/*angular.module('crescendoApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });*/

//Data
var listings = [
    {
        name : 'Chartreuse Bistro',
        desc : '10% OFF NEXT MEAL',
        lat : 36.8476415,
        long : -76.290753
    },
    {
        name : 'The Grilled Cheese Bistro',
        desc : 'FREE APPETIZER',
        lat : 36.85111029999999,
        long : -76.2902098
    },
    {
        name : 'Nouvelle Restaurant',
        desc : '10% OFF ENTRIRE ORDER',
        lat : 36.8555046,
        long : -76.29153269999999
    },
    {
        name : 'Field Guid',
        desc : '15% OF ENTRÉE',
        lat : 36.852064,
        long : -76.28978099999999
    },
    { 
        name : 'Saint Germain',
        desc : '20% OFF DESERT WITH PURCHASE OF MEAL',
        lat : 36.8496189,
        long : -76.2909619
    }
];

//Angular App Module and Controller
angular.module('crescendoApp')
  .controller('MainCtrl', function ($scope) {

    var mapOptions = {
        zoom: 16,
        center: new google.maps.LatLng(36.8496189, -76.2909619),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
    var createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.name
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        
    }  
    
    for (var i = 0; i < listings.length; i++){
        createMarker(listings[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});