define(["js/inconvpago/inconvpagoView"], function(InconvpagoView) {
 
//    var state = {isNew: false};
//    var contact = null;
 
    function init(){//query
//        var contacts = tempInitializeStorage();
        
            InconvpagoView.render();
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
			new Contact({img: "Tienda.svg", titulo: "Módulo Productos y/o Servicios", descripcion: "Mostrar tus proudctos y/o servicios de manera visual y llamativa es parte importante del marketing para tu negocio.", urlmodulo: "#", urlcompra: "#" }),
			new Contact({img: "Informacion.svg", titulo: "Módulo Información", descripcion: "Es importante contar los orígenes de la marca y la visión que tiene el negocio, así generarás mayor confianza.", urlmodulo: "#", urlcompra: "#" }),
			new Contact({img: "Soporte.svg", titulo: "Módulo Servicio al Cliente", descripcion: "La comunicación con tus clientes debe ser una prioridad para tí, así garantizarás que estén completamente satisfechos.", urlmodulo: "#", urlcompra: "#" }),
			new Contact({img: "Multimedia.svg", titulo: "Módulo Multimedia", descripcion: "Las imágenes y videos tienen un mayor impacto a la hora de comprar un produco o servicio. Utiliza esta herramienta para mejorar tus ventas.", urlmodulo: "#", urlcompra: "#" }),
			new Contact({img: "Contacto.svg", titulo: "Módulo Contacto", descripcion: "Si un posible cliente instala tu aplicación móvil, necesitarás de este módulo para que se comunique con tigo fácilmente y de esta manera no perderás una posble venta.", urlmodulo: "#", urlcompra: "#" }),
			new Contact({img: "Viral.svg", titulo: "Módulo Viral", descripcion: "Tus clientes podrán compartir el contenido que les parezca relevante de tu aplicación.  Recuerda que esto es importante para darte a conocer rápidamente.", urlmodulo: "#", urlcompra: "#" }),
			new Contact({img: "Publicidadi.svg", titulo: "Módulo Publicidad", descripcion: "Podrás enviar mensajes directos a tus clientes ofreciendoles una promoción o informándoles acerca de un nuevo producto o servicio.", urlmodulo: "#", urlcompra: "#" }),
			new Contact({img: "Marketing.svg", titulo: "Módulo Marketing", descripcion: "Difundiremos tu aplicación y haremos que consigas nuevos clientes, posicionándola en las tiendas móviles: App Store y Play Store.", urlmodulo: "#", urlcompra: "#" })			
		];
		localStorage.setItem("f7Base", JSON.stringify(contacts));
		return JSON.parse(localStorage.getItem("f7Base"));
	}
    return {
        init: init
    };
});