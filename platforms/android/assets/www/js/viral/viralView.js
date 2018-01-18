define(['hbs!js/viral/viral'], function(viewTemplate) {
    var $ = Framework7.$;
    function render() {
        $('.viral-page').html(viewTemplate());
    }
    return {
        render: render
    }
});  