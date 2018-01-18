define(['hbs!js/otroprob/otroprob'], function(viewTemplate) {
    var $ = Framework7.$;
 
    function render() {
        $('.otroprob-page').html(viewTemplate());
    }
 
    return {
        render: render
    }
});  