define(['hbs!js/contacto/contacto'], function(viewTemplate) {
    var $ = Framework7.$;
//    var f7 = new Framework7();
        
    function render() {
        $('.contacto-page').html(viewTemplate());
        initialize(); 
    }
   

    function initialize() { // define function
        var latitud="40.639409";
        var longitud="-73.897900";
        var mapProp = {
          center: new google.maps.LatLng(latitud, longitud),
          zoom: 5,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('map-canvas'), mapProp);
        var geocoder = new google.maps.Geocoder;
        var infowindow = new google.maps.InfoWindow;
        geocodeLatLng(geocoder, map, infowindow,latitud,longitud);
    }
    function geocodeLatLng(geocoder, map, infowindow,latitud,longitud) {
        var latlng = {lat: parseFloat(latitud), lng: parseFloat(longitud)};
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[1]) {
    //            console.log(JSON.stringify(results[1]["formatted_address"]));
                $("#address").text(results[1]["formatted_address"]);
              map.setZoom(11);
                var marker = new google.maps.Marker({
                  position: latlng,
                  map: map
                });
                infowindow.setContent(results[1].formatted_address);
                infowindow.open(map, marker);
            } else {
                window.alert('No results found');
            }
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
    
    return {
        render: render
    }
});  