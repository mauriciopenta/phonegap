define(['hbs!js/conocerprod/conocerprod'], function(viewTemplate) {
    var $ = Framework7.$;
 
    function render() {//params
//        console.log(JSON.stringify(params.model));
        $('.conocerprod-page').html(viewTemplate());
//        $('.contacts-header').text(params.state.isNew ? "New contact" : "Contact");
    }
 
    return {
        render: render
    }
});  