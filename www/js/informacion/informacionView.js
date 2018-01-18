define(['hbs!js/informacion/informacion'], function(viewTemplate) {
    var f7 = new Framework7();
    function render() {
        $.ajax({
//                url: 'http://meew.co/dashmeew/index.php/site/loginPlatformMovile',
                url: 'http://localhost/meewcp/index.php/site/dataContent',
                dataType: 'json',
                data:{dato:"1"},
                type: 'post',
                async:true,
                crossDomain : true,
//                before: f7.showPreloader(),
                success: function(data) {
//                     $('.informacion-page').html(viewTemplate());
                  $('.informacion-page').html(data.content.texto_html);
//console.log(data.content.texto_html);
                },
                error:function(error){
                    f7.hidePreloader();
                    f7.alert("error en la comunicación con el servidor");
                },
            });
//            $('.informacion-page').html(viewTemplate());
    }
    return {
        render: render
    }
});  