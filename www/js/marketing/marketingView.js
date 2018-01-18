define(['hbs!js/marketing/marketing'], function(viewTemplate) {
    var $ = Framework7.$;
    function render() {
        $('.marketing-page').html(viewTemplate());
    }
    return {
        render: render
    };
});  