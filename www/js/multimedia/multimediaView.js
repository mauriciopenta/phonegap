define(['hbs!js/multimedia/multimedia'], function(viewTemplate) {
    var $ = Framework7.$;
    function render() {
        $('.multimedia-page').html(viewTemplate());
    }
    return {
        render: render
    }
});  