define(['hbs!js/inconvprodserv/inconvprodserv'], function(viewTemplate) {
    var $ = Framework7.$;
 
    function render() {//params
//        console.log(JSON.stringify(params.model));
        $('.inconvprodserv-page').html(viewTemplate());
//        $('.contacts-header').text(params.state.isNew ? "New contact" : "Contact");
    }
 
    return {
        render: render
    }
});  