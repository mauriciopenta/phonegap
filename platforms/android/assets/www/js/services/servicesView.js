define(['hbs!js/services/services'], function(viewTemplate) {
    var $ = Framework7.$;
 
    function render(params) {//params
//        console.log(JSON.stringify(params.model));
        $('.products-page .content-block-tienda').html(viewTemplate(params.model));
//        $('.contacts-header').text(params.state.isNew ? "New contact" : "Contact");
    }
 
    return {
        render: render
    }
});  