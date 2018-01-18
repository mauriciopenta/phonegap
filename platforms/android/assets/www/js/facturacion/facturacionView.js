define(['hbs!js/facturacion/facturacion'], function(viewTemplate) {
    var $ = Framework7.$;
 
    function render() {
        $('.facturacion-page').html(viewTemplate());
    }
 
    return {
        render: render
    }
});  