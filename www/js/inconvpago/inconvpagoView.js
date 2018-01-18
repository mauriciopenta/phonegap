define(['hbs!js/inconvpago/inconvpago'], function(viewTemplate) {
    var $ = Framework7.$;
 
    function render() {
        $('.inconvpago-page').html(viewTemplate());
    }
    return {
        render: render
    }
});  