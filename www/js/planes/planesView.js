define(['hbs!js/planes/planes'], function(viewTemplate) {
    var $ = Framework7.$;
 
    function render() {//params
        
        $('.planes-page').html(viewTemplate());
//        $('.contacts-header').text(params.state.isNew ? "New contact" : "Contact");
    }
 
    return {
        render: render
    }
});  