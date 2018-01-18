define(["js/list/listView","js/list/listSlider"], function(ListView,ListSlider) {
	function init() {
            if(localStorage.getItem("email")!=""){
                if(localStorage.getItem("idplantilla")!=null){
                    if(localStorage.getItem("idplantilla")==1){
                        ListView.render();
                    }
                    else{
                        ListSlider.render();

                    }
                }
            }
	}
	return {
		init: init
	};
});