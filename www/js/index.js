/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
//        document.addEventListener("backbutton", onBackKeyDown, false); 
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        
        console.log('Received Device Ready Event');
        console.log('calling setup push');
//        navigator.splashscreen.show();
        app.setupPush();
    },
    setupPush: function() {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                "senderID": "XXXXXXXX"
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function(data) {
            console.log('registration event: ' + data.registrationId);

            var oldRegId = localStorage.getItem('registrationId');
            if (oldRegId !== data.registrationId) {
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
                // Post registrationId to your app server as the value has changed
            }

//            var parentElement = document.getElementById('registration');
//            var listeningElement = parentElement.querySelector('.waiting');
//            var receivedElement = parentElement.querySelector('.received');
//
//            listeningElement.setAttribute('style', 'display:none;');
//            receivedElement.setAttribute('style', 'display:block;');
        });

        push.on('error', function(e) {
            console.log("push error = " + e.message);
        });

        push.on('notification', function(data) {
            console.log('notification event');
            navigator.notification.alert(
                data.message,         // message
                null,                 // callback
                data.title,           // title
                'Ok'                  // buttonName
            );
       });
    }
};
function showMap(){
    alert(document.getElementById("map-canvas"));
//    navigator.notification.alert(
//        position.coords.latitude+"-"+position.coords.longitude,         // message
//        null,                 // callback
//        "Oops",           // title
//        'Ok'                  // buttonName
//    ); 
    var mapOptions = {
    center: new google.maps.LatLng("40.639409", "-73.897900"),
    zoom: 18,
//    mapTypeId: google.maps.MapTypeId.,
//    heading: 90,
//    tilt: 45
  };
    var map; 
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng("40.639409", "-73.897900"),
      map: map,
	  title: 'Última posición'
    });

    google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent("Última posición");
    infowindow.open(map, marker);
  });
}

function loadmap(){
    var latitud="40.639409";
    var longitud="-73.897900";
    var mapOptions = {
        center: new google.maps.LatLng(latitud,longitud),
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        heading: 90,
        tilt: 45
      };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitud,longitud),
        map: map,
	title: 'Mi negocio'
    });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent("Última posición");
        infowindow.open(map, marker);
    });
    //markers.push(marker);
}
function geocodeLatLng(geocoder, map, infowindow,latitud,longitud) {
    var latlng = {lat: parseFloat(latitud), lng: parseFloat(longitud)};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[1]) {
//            console.log(JSON.stringify(results[1]["formatted_address"]));
            $("#address").text(results[1]["formatted_address"]);
//          map.setZoom(11);
//            var marker = new google.maps.Marker({
//              position: latlng,
//              map: map
//            });
//            infowindow.setContent(results[1].formatted_address);
//            infowindow.open(map, marker);
        } else {
            window.alert('No results found');
        }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
    });
}