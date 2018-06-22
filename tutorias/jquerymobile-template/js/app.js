/*
* Inicializo variables
*/
var savedUserData = localStorage.getItem('userData');
var note = {};

/*
* Chequeo si ya existo algo en localstorage
*/
if(savedUserData != null){
	var userData = JSON.parse(savedUserData);
}

/*
* Actualiza localStorage
*/
var refreshLocalStorage = function(){
	// Parse a string del objecto a guardar en localstorage
	var strUserdata = JSON.stringify(userData);
	// Seteo el item y guardo como string toda la info
	localStorage.setItem('userData', strUserdata);
	// Obtengo los datos que acabo de guardar y los formateo a JSON
	userData = JSON.parse(localStorage.getItem('userData'));
};

/**
* Primera carga de la aplicación
* Configuraciones generales de jqueryMobile
**/
$(document).on('pageinit', function(){
	$.mobile.defaultPageTransition = "fade";
	$.mobile.changePage.defaults.changeHash = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
});

/**
* Código a ejecutar en una página específica
* La función se ejecuta antes de que se cargue la página
**/
$(document).on('pagebeforecreate', '#view1', function(){
	console.log('Se abrió la vista 1')
});

// Primera carga de página
$(document).on('pageinit', '#view2' ,function(){
	console.log('Se abrió la vista 2');
	// Ejemplo para cambiar de página desde javascript 
	// con la api que nos da jquery mobile
	var btnExample = $("#btn-example");
	// Al hacer click sobre el boton ejecuto el cambio de página
	btnExample.click(function(){
		$.mobile.changePage('#view1');
	});
	
});