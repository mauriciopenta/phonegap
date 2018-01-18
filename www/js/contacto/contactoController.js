define(["js/contacto/contactoView"], function(ContactoView) {
 
//    var state = {isNew: false};
//    var contact = null;
 
    function init(){//query
//        var contacts = tempInitializeStorage();}

            ContactoView.render();
//        if (query && query.id) {
//            var contacts = JSON.parse(localStorage.getItem("f7Base"));
//            for (var i = 0; i < contacts.length; i++) {
//                if (contacts[i].id === query.id) {
//                    contact = contacts[i];
//                    state.isNew = false;
//                    break;
//                }
//            }
//        }
//        else {
//            contact = { id: Math.floor((Math.random() * 100000) + 5).toString()};
//            state.isNew = true;
//        }
//        ServicesView.render();
    }
    function loadContacts() {
		var f7Base = localStorage.getItem("f7Base");
		var contacts = f7Base ? JSON.parse(f7Base) : tempInitializeStorage();
		return contacts;
	}

	function tempInitializeStorage() {
		var contacts = [
			new Contact({img: "Perfil.svg", titulo: "Módulo LOGIN", descripcion: "Tus clientes podrán registrarse y acceder por medio de su correo electrónico, facebook y google.", urlmodulo: "#", urlcompra: "#" }),			
			new Contact({img: "Perfil.svg", titulo: "Módulo LOGIN", descripcion: "Tus clientes podrán registrarse y acceder por medio de su correo electrónico, facebook y google.", urlmodulo: "#", urlcompra: "#" }),
			new Contact({img: "Perfil.svg", titulo: "Módulo LOGIN", descripcion: "Tus clientes podrán registrarse y acceder por medio de su correo electrónico, facebook y google.", urlmodulo: "#", urlcompra: "#" })			
		];
		localStorage.setItem("f7Base", JSON.stringify(contacts));
		return JSON.parse(localStorage.getItem("f7Base"));
	}
    return {
        init: init
    };
});