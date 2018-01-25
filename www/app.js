require.config({
    paths: {
        handlebars: "lib/handlebars",
        text: "lib/text",
        hbs: "lib/hbs"
    },
    shim: {
        handlebars: {
            exports: "Handlebars"
        }
    }
});
define('app',['js/router','js/contactModel'], function(Router,Contact) {
    Router.init();
    FacebookInAppBrowser.settings.appId = '1999950346892051';
    FacebookInAppBrowser.settings.redirectUrl = 'https://www.facebook.com/connect/login_success.html';
    FacebookInAppBrowser.settings.permissions = 'email';

// Optional
    FacebookInAppBrowser.settings.timeoutDuration = 7500;
    var contact=null;
    var $$=Dom7;
    var f7 = new Framework7({
            animateNavBackIcon: true,
            pushState: true
    });
    var ret={
        f7: f7
//        mainView: mainView,
//        view1:view1,
//        view2:view2,
////        view3:view3,
//        router: Router
    };
    localStorage.setItem("pagina",0);
    localStorage.setItem('email', "");
    var email=localStorage.getItem('email');
//    f7.alert(email);
    var ini=false;
    if(email==null || email.length==0){
        f7.popup('.popup-about',false);
    }
    $$('#cerrarSesion').on('click',function(){
        FacebookInAppBrowser.logout(function() {
            f7.popup('.popup-about',false);
        });
    });
    $$('.loginfb').on('click',function(){
        console.log("entra a login facebook");
        f7.showPreloader();
        FacebookInAppBrowser.login({
            send: function() {
                    console.log('login opened');
//                    f7.hidePreloader();
            },
            success: function(access_token) {
                f7.hidePreloader();
                localStorage.setItem('email', "email");
                    console.log('done, access token: ' + access_token);
                    f7.closeModal(".login-screen",false);
            },
            denied: function() {
                f7.hidePreloader();
                    console.log('user denied');
            },
            timeout: function(){
                f7.hidePreloader();
                console.log('a timeout has occurred, probably a bad internet connection');
            },
            complete: function(access_token) {
                f7.hidePreloader();
                    console.log('window closed');
                    if(access_token) {
                            console.log(access_token);
                    } else {
                            console.log('no access token');
                    }
            },
            userInfo: function(userInfo) {
                    if(userInfo) {
                            console.log(JSON.stringify(userInfo));
                    } else {
                            console.log('no user info');
                    }
            }
        });
    });
    var mainView = f7.addView('.view-main', {
        dynamicNavbar: true
    });
    ret['mainView']=mainView;
    
    $$('.salir').on('click',function(){
        navigator.app.exitApp();
    });
    $$('.close-popupi').on('click', function () {
        $("#form-login").validate({
            rules: {
                "usuario": "required",
                "password":"required",
            },
            messages: {
                "usuario": "Debe digitar uario",
                "password":"Debe digitar contraseña",
            }});
        $$('.login-screen .link-login').on('click', loginMeew);
        f7.loginScreen(".login-screen",false);
        f7.closeModal(".popup-about",false);
    });
    $$('.popback-register').on('click', function () {
        f7.loginScreen(".popup-about",false);
        f7.closeModal(".popup-register",false);
    });
     
    function loginMeew(){
//        var username = $$('.login-screen input[name="username"]').val();
//        var password = $$('.login-screen input[name="password"]').val();
        if ($("#form-login").valid()) {
            contact = new Contact();
            var formInput = f7.formToJSON('#form-login');
            contact.setValues(formInput);
            var datos=JSON.stringify(contact);
            $.ajax({
                url: 'http://meew.co/dashmeew/index.php/site/loginPlatformMovile',
//                url: 'http://localhost/meew/index.php/site/loginPlatformMovile',
                dataType: 'json',
                data:JSON.parse(datos),
                type: 'post',
                async:true,
                crossDomain : true,
                before: f7.showPreloader(),
                success: function(data) {
                    console.log(JSON.stringify(data.contmb)+"------------|||||----------------");
//                    var retrivedContent=localStorage.getItem('content');
//                    console.log(JSON.parse(retrivedContent));
                    
                    f7.hidePreloader();
                    if(data.status=='exito'){
                        cargacssBackground(data.image);
//                        $(".main-page").css("background",'url('+data.image+') no-repeat center center');
//                        $(".main-page").addClass('homepage');
                        
                        localStorage.setItem('content', JSON.stringify(data.contplantilla));
                        localStorage.setItem('email', data.usuario.email);
                        localStorage.setItem('personid', data.usuario.personid);
                        localStorage.setItem('personanombre', data.usuario.nombre);
                        localStorage.setItem('token', data.usuario.token);
                        localStorage.setItem("idplantilla", data.idplantilla);
                        f7.closeModal(".login-screen",false);
                        cargaMenuBottom(JSON.stringify(data.contmb));
//                        console.log(localStorage.getItem("personanombre")+"---------------------");
                        Router.load("list");
                        
                    }
                    else{
                        f7.alert(data.msg);
                    }
                },
                error:function(error){
                    f7.hidePreloader();
                    $('.list-block-label').html(JSON.stringify(error));
                },
                
            });
            
        }
       
       
//       f7.alert('Username: ' + username + ', Password: ' + password, function () {
//         f7.closeModal('.login-screen',false);
//       });
    }
    function cargaMenuBottom(contmb){
        var number=3;
        var contmbAux=JSON.parse(contmb);
        console.log(contmbAux);
        $.each(contmbAux,function(key,v){
            number=number+1;
            
            var contentmb='<div id="view-'+number+'" class="view tab">'+
            'We can make with view with navigation, let\'s add Top Navbar'+
          '<div class="navbar">'+
             '<div class="navbar-inner">'+
               '<div class="center sliding"><span class="navbar-logo"></span></div>'+
             '</div>'+
           '</div>'+
           '<div class="pages navbar-through">'+
                '<div class="page planes-page'+number+'">'+
                    number+
                '</div>'+
           '</div>'+
         '</div>';
            $('.views').append(contentmb);
            var menBottom='<a href="#view-'+number+'" class="tab-link view-'+number+'">'+
                    '<i class="f7-icons size-50 color-custom">'+v.icon+'</i><span class="tabbar-label">'+v.nombre_modulo+'</span>'
                '</a>';
                $('.toolbar-inner').append(menBottom);
                
            window["view"+number] = f7.addView('#view-'+number,{dynamicNavbar:true});
            ret["view"+number]=window["view"+number];
            creaEvento(number,v);
            
        });
        
    }
    function creaEvento(n,v){
        $(".view-"+n).on('click',function(){
                console.log("pasa a vista "+n);
                Router.load("loadbmenu",{id:n,idmod:v.id_modulo_app,tipomod:v.tipo_modulo,nombremod:v.nombre_modulo});
            });
    }
    function cargacssBackground(image){
        $(".main-page").css("background",'url(images/'+image+') no-repeat center center');
        $(".main-page").css("background-attachment",'scroll');
        $(".main-page").css("background-size",'auto auto');
        $(".main-page").css("background-attachment",'fixed');
        $(".main-page").css("-webkit-background-size",'100%');
        $(".main-page").css("-moz-background-size",'100%');
        $(".main-page").css("-o-background-size",'100%');
        $(".main-page").css("background-size",'100%');
        $(".main-page").css("-webkit-background-size",'cover');
        $(".main-page").css("-moz-background-size",'cover');
        $(".main-page").css("-o-background-size",'cover');
        $(".main-page").css("background-size",'cover');
    }
    $$('.link-register').on('click', function () {
        f7.popup('.popup-register',false); 
        $("#fomr-serv").validate({
            rules: {
                "persona_nombre": "required",
                "persona_apellidos":"required",
                "usuario":"required",
                "password":"required",
                "persona_correo":{
                    required: true,
                    email: true
                },
                "repassword":{
                    equalTo: "#password"
                },
                "phone":"required",
//                "accept":"required"
            },
            messages: {
                "persona_nombre": "El nombre es requerido",
                "persona_apellidos":"El apellido es requerido",
                "usuario":"El nombre de usuario es requerido",
                "password":"La contraseña es requerida",
                "persona_correo":{
                    required: "El correo es requerido",
                    email: "Debe digitar un correo válido ej: xyz@dominio.com"
                },
                "repassword":{
                    equalTo: "La confirmación de la contraseña no coincide con la contraseña"
                },
                "phone":"Número de teléfono es requerido",
//                "accept":"Debe aceptar los términos y condiciones."
            }});
        $$(".creaCuenta").on("click", registerUser);
        f7.closeModal(".popup-about",false);  
    });
    $$('.open-services').on('click', function () {
        f7.popup('.popup-services');
    });var mainView = f7.addView('.view-main', {
        dynamicNavbar: true
    }); 
    
    document.addEventListener("backbutton", onBackKeyDown, false); 
    var view1=f7.addView('#view-1',{dynamicNavbar:true});
//    var view2=f7.addView('#view-2',{dynamicNavbar:true});
//    var view3=f7.addView('#view-3',{dynamicNavbar:true});
    ret['view1']=view1;
//    ret['view2']=view2;
//    ret['view3']=view3;
    ret['router']=Router;
    f7.onPageInit('*',function(page){
//        document.addEventListener("backbutton", onBackKeyDown, false); 
        $$(page.navbarInnerContainer).find('.envia_cserv').on('click',function(){ 
            var formData = f7.formToJSON('#fomr-serv');
            f7.alert(JSON.stringify(formData));
        });
    });
    f7.onPageInit('list',function(page){
        f7.alert("list");
    });
    function onBackKeyDown(e){
//        navigator.notification.alert(
//            JSON.stringify(mainView.activePage.name),         // message
//            null,                 // callback
//            "Hello",           // title
//            'Ok'                  // buttonName
//        );
//        window.location.href="list";
mainView.activePage.name="list";
//mainView.router.back({ 
//                    ignoreCache: true
//                })
        mainView.router.back();
//        mainView.router.refreshPreviousPage();
//    navigator.app.backHistory();
//    if (myView.activePage.name === 'list' || myView.activePage.name === 'planes' ) {
//		navigator.app.exitApp();
////		return false;
//    } else {      
//            myView.router.back();
//    }
//    
//    return true;
//var mainView = myApp.addView('.view-main');
//    if(document.getElementById('#view-1')){
//        e.preventDefault();
//        navigator.app.backHistory();
//    }
//    else {
//        navigator.app.backHistory();
//    }
//return false;
}
    function registerUser(){
        if ($("#fomr-serv").valid()) {
            contact = new Contact();
            var formInput = f7.formToJSON('#fomr-serv');
            contact.setValues(formInput);
//            f7.alert(contact.Usuario["accept"]);
//            return false;
            if (!contact.validate()) {
                f7.alert("Debe aceptar los términos y condiciones");
                return;
            }
            var datos=JSON.stringify(contact);
            $.ajax({
                url: 'http://meew.co/dashmeew/index.php/site/registerPlatformMovile',
                dataType: 'json',
                data:JSON.parse(datos),
                type: 'post',
                async:true,
                crossDomain : true,
                before: f7.showPreloader(),
                success: function(data) {
                    f7.hidePreloader();
                    f7.alert(data.msg);
                    if(data.status=='exito'){
                        console.log(contact.Usuario["email"]);
                        localStorage.setItem('email', contact.Usuario["email"]);
                        f7.closeModal(".popup-register",false);
                    }
                },
                error:function(error){
                    f7.hidePreloader();
                    f7.alert("error en la comunicación con el servidor");
                },
                
            });
            
        }
    }
    
   return ret//{
//        f7: f7,
//        mainView: mainView,
//        view1:view1,
//        view2:view2,
//        view3:view3,
//        router: Router
//    }
});

