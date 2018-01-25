define(['hbs!js/container/gallery','hbs!js/container/container','hbs!js/container/contacto','hbs!js/container/soporte'], function(viewGallery,viewContainer,viewContacto,viewSoporte) {
    var f7 = new Framework7();
    function render(params) {
        var content="";
        $.ajax({
                url: 'http://meew.co/dashmeew/index.php/site/dataContent',
//                url: 'http://localhost/meew/index.php/site/dataContent',
                dataType: 'json',
                data:{idmod:params.idmod},
                type: 'post',
                async:true,
                before: f7.showPreloader(),
                success: function(data) {
//                    $('.titlecont').html(data.content.nombre_modulo);
//                    $('.container-page').html(data.content);

                    f7.hidePreloader();
                    cargaContenido(data,params);
//console.log(data.content.texto_html);
                },
                error:function(error){
                    f7.hidePreloader();
                    f7.alert("error en la comunicación con el servidor");
                },
            });
//            console.log(params.tipomod);
//        
       
//            $('.informacion-page').html(viewTemplate());
    } 
    function cargaContenido(data,params){
        switch(params.tipomod){
            case "1":
                $('.titlecont').html(params.nombremod);
                $('.container-page').html(viewGallery);
        //        $('.textogallery').html("texto de la galería");
        //        $('.imagesgallery').html("imagesgallery");
        //        $('.videosgallery').html("videosgallery"); 
                var imagenes="";
                var videos="";
                $.each(data.content,function(key,value){
                    if(value.tipo_contenido==1){
                        imagenes+='<div class="col-25"><img src="'+value.file_name+'" style="width: 100%"></div>';
                    }
                    else if(value.tipo_contenido==2){
                        videos='<div class="row" style="text-align: left; ">'+
                                value.description+
                                '</div> <br>'+
                                '<iframe style="width: 100%;height:250px" src="https://www.youtube.com/embed/'+value.url_video+'" frameborder="0" allowfullscreen></iframe>';
                    }
                });
                $('.imagesgallery').html(imagenes);
                $('.videosgallery').html(videos); 
            break;
            case "2":
                $('.titlecont').html(params.nombremod);
        //        $('.textogallery').html("texto de la galería");
        //        $('.imagesgallery').html("imagesgallery");
        //        $('.videosgallery').html("videosgallery"); 
                var imagenes="";
                var videos="";
                $.each(data.content,function(key,value){
                    if(value.tipo_contenido==1){
                        imagenes+='<div class="col-25"><img src="'+value.file_name+'" style="width: 100%"></div>';
                    }
                    
                });
                $('.container-page').html(imagenes);
                break;
            case "3":
//                var textohtml='<div class="page-content">'+data.content+'</div>';
                $('.container-page').html(viewContainer);
                $('.page-content-articulo').html(data.content);
                break;
            case "4":
                $('.container-page').html(viewContacto);
                $('.nombre').text(localStorage.getItem('personanombre'));
                initialize();
                break;
            case "5":
                console.log(data.content);
                var opciones='<option value="">Seleccione...</option>';
                 $.each(data.content,function(key,value){
                        opciones+='<option value="'+value.idtema_soporte+'">'+value.titulo+'</option>';
                });
                $('.container-page').html(viewSoporte);
                $('.temasoporte').html(opciones);
                
                break;
                
        }
        
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