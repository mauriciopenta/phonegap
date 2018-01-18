define(['hbs!js/publ/publ'], function(viewTemplate) {
    var $ = Framework7.$;
    function render() {
        $('.publ-page').html(viewTemplate());
    }
    return {
        render: render
    };
});  