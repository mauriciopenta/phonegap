define(['app'],function(app) {
	function Contact(values) {
		values = values || {};
		this.img = values['img'] || '';

		this.titulo = values['titulo'] || '';
		this.descripcion = values['descripcion'] || '';
		this.urlmodulo = values['urlmodulo'] || '';
                this.urlcompra = values['urlcompra'] || '';
	}

	Contact.prototype.setValues = function(formInput) {
		for(var field in formInput){
			if (this[field] !== undefined) {
				this[field] = formInput[field];
			}
		}
	};

	Contact.prototype.validate = function() {
		var result = true;
		if (!this.firstName && !this.lastName) {
			result = false;
		}
		return result;
	};

	return Contact;
});