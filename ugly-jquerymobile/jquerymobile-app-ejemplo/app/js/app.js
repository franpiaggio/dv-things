// Inicializo variables
var userData = {
	"firstTime" : true,
	"name" : '',
	"lastCat": '',
	"userFavs" : [],
	"fontSize" : "normal"
};
var savedUserData = localStorage.getItem('userData');
// Cuento por default
var story = {};
// Categoría por default
var selectedCat = '';
// Cuentos filtrados
var filteredStories = [];
// Si hay algo en localstorage lo asigno
if(savedUserData != null){
	var userData = JSON.parse(savedUserData);
}

// Funciones de los cuentos
// retorna la lista de nombres
// Según los IDS
var getStories = function(arr){
	var list  = [];
	for(var i = 0; i < arr.length; i++){
		var match = $.grep(stories, function(e){
			return e.id == arr[i];
		})
		var id = match[0].id;
		var li = document.createElement('li');
		li.innerHTML = "<a href='#'>" + match[0].name + "</a>";
		// este evento aisla los datos del id y match 
		// con una función anónima
		// de lo contrario JS pierde referencia en el loop
		li.onclick = (function(id, match){
			return function(){
				viewStory(match, id);
			}
		})(id,match);
		// Separo cada nuevo <li> en una lista
		list.push(li);
	}
	return list;
}
var viewStory = function(selectedStory, id){
	for(var i = 0; i < stories.length; i++){
		if(stories[i].id === id){
			story = stories[i];
		}
	}
	// Asigno el nuevo cuento
	// Cambio de categoría
	$.mobile.changePage('#story');
};
// Obtiene segun la categoria
var getByCat = function(cat){
	var list  = [];
	var match = {};
	for(var i = 0; i < stories.length; i++){
		if(stories[i].cat === cat){
			match = stories[i]
			var id = match.id;
			var li = document.createElement('li');
			li.innerHTML = "<a href='#'>" + match.name + "</a>";
			// este evento aisla los datos del id y match 
			// con una función anónima
			// de lo contrario JS pierde referencia en el loop
			li.onclick = (function(id, match){
				return function(){
					viewStory(match, id);
				}
			})(id,match);
			// Separo cada nuevo <li> en una lista
			list.push(li);
			}
	}
	return list;
};
// Obtiene una lista de favoritos
var getFavs = function(){
	var list = [];
	for(var i = 0; i < userData.userFavs.length; i++){
		var fav = userData.userFavs[i]
		var id = fav.id;
		var li = document.createElement('li');
		li.innerHTML = "<a href='#'>" + fav.name + "</a>";
		li.onclick = (function(id, fav){
			return function(){
				viewStory(fav, id);
			}
		})(id,fav);
		list.push(li);
	}
	return list;
};
// Obj que modifica el DOM
var domStories = {
	"getStories" : getStories,
	"getByCat" : getByCat,
	"getFavs" : getFavs
};

// Funciones generales
// Actualiza el userData
var refreshLocalStorage = function(){
	var strUserdata = JSON.stringify(userData);
	localStorage.setItem('userData', strUserdata);
	userData = JSON.parse(localStorage.getItem('userData'));
};

// Revisa si está repetido un cuento
var checkIfRepeated = function(story, favs){
	for(var i = 0; i < favs.length; i++){
		if(favs[i].id === story.id){
			return false;
		}
	}
	return true;
}

//Cerrar la app
var exitApp = function() {
	if(navigator.app){
    	navigator.app.exitApp();
	}
	else if(navigator.device){
	    navigator.device.exitApp();
	}
}

// Primera carga de la app
// Configuraciones generales
$(document).on('pageinit', function(){
	$.mobile.defaultPageTransition = "fade";
	$.mobile.changePage.defaults.changeHash = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
});
// Cada vez que carga una página
$(document).on('pageinit', function(){       
    $("#exit").click(function(){
    	exitApp();
    });
});

// Antes de crear la página #welcome
$(document).on('pagebeforecreate', '#welcome', function(){
	// Si no es la primera vez salteo la página
	// Quito el efecto
	if(!userData.firstTime){
		$.mobile.changePage('#home',{
			"transition" : "none"
		});
	};
});

// Primera carga de página
$(document).on('pageinit', '#welcome' ,function(){
	// Input y btn
	var userName = $("#userName");
	var nextBtn = $("#welcomeBtn");
	// Deshabilitados
	nextBtn.attr('disabled', 'disabled');
	$("#welcome .ui-btn").addClass('ui-btn-disabled');

	// Al presionar una tecla chequeo si esta vacio
    userName.keyup(function() {
        var empty = false;
        if ($(this).val().length == 0) {
            empty = true;
        }
        if (empty) {
        	$("#welcome .ui-btn").addClass('ui-btn-disabled');
            nextBtn.attr('disabled', 'disabled');
        } else {
        	$("#welcome .ui-btn").removeClass('ui-btn-disabled');
            nextBtn.removeAttr('disabled');
        }
    });
	// Al enviar el nombre
	$('#name').submit(function(e){
		e.preventDefault();
		// Asigno valores
		userData.name = userName.val();
		userData.firstTime = false;
		// Actualizo y cambio de página
		refreshLocalStorage();
		$.mobile.changePage('#home');
	});
});

// Antes de que crear la pagina #home
$(document).on('pagebeforecreate', '#home', function(){
	// Esto se crea antes porque jquery despues lo procesa
	// en el evento de init
	var recomended = domStories.getStories([1,2]);
	$("#recomended").append(recomended);
});
// Carga de home
$(document).on('pagebeforecreate', '#home' ,function(){
	$("#homeName").text(userData.name);
});
$(document).on('pageshow', '#home' ,function(){
	$("#homeName").text(userData.name);
});
// Carga de categorias
$(document).on('pageinit', '#cat' ,function(){
	$("#aventuras").click(function(){
		userData.lastCat = 'aventuras';
		refreshLocalStorage();
		$('#cat-res').trigger('pagebeforecreate');
		$('#cat-res').trigger('pageinit');
		$.mobile.changePage('#cat-res');
	});
	$("#fantasia").click(function(){
		userData.lastCat = 'fantasia';
		refreshLocalStorage();
		$('#cat-res').trigger('pagebeforecreate');
		$('#cat-res').trigger('pageinit');
		$.mobile.changePage('#cat-res');
	});
	$("#misterio").click(function(){
		userData.lastCat = 'misterio';
		refreshLocalStorage();
		$('#cat-res').trigger('pagebeforecreate');
		$('#cat-res').trigger('pageinit');
		$.mobile.changePage('#cat-res');
	});
	$("#animales").click(function(){
		userData.lastCat = 'animales';
		refreshLocalStorage();
		$('#cat-res').trigger('pagebeforecreate');
		$('#cat-res').trigger('pageinit');
		$.mobile.changePage('#cat-res');
	});
});
// Precarga de resultados de categoria
$(document).on('pagebeforecreate', '#cat-res', function(){
	$("#cat-res-list").empty();
	filteredStories = getByCat(userData.lastCat);
	$("#cat-res-list").append(filteredStories);
	// Si no hay ninguna seteada la asigno
	// En caso de que se haga reload no pierdo el dato
	if(userData.lastCat === ''){
		userData.lastCat = selectedCat;
	}else{
		selectedCat = userData.lastCat;
	}
	refreshLocalStorage();
	$("#catname").text(userData.lastCat);
});
// Carga de cat-res
$(document).on('pageinit', '#cat-res' ,function(){
	// Fix de jquery mobile
	// por problema con la carga AJAX del modulo
	if($("#cat-res-list").listview()){
		$("#cat-res-list").listview("refresh")
	};
});
/// Carga de cuento
$(document).on('pageshow', '#story' ,function(){
	$("#story h2").html(story.name);
	$('#story-content').html(story.story);
	if(userData.fontSize === "normal" ){
		$('#story-content').css("font-size", "1rem");
		$("#story h2").css("font-size", "1rem");
	}
	if(userData.fontSize === "big"){
		$('#story-content').css("font-size", "1.3rem");		
		$("#story h2").css("font-size", "1.3rem");		
	}
	$("#deleteFavs").unbind('click').bind('click', function(event) {
		for(var i = 0; i < userData.userFavs.length; i++){
			if(userData.userFavs[i].id === story.id){
				userData.userFavs.splice(i, 1);
			}
		}
		$("#popupRemove").popup("open");
		$(".button-box div:first-child").css('display', "block");
		$("#deleteFavs").addClass('none');
		refreshLocalStorage();
	});
	if(!checkIfRepeated(story, userData.userFavs)){;
		$(".button-box div:first-child").css('display', "none");
		$("#deleteFavs").removeClass('none');
	}else{
		$(".button-box div:first-child").css('display', "block");
		$("#deleteFavs").addClass('none');
	};

	$('#saveStory').unbind('click').bind('click', function(event) {
		if(checkIfRepeated(story, userData.userFavs)){
			userData.userFavs.push(story);
			$("#popupBasic").popup( "open" )
			$("#deleteFavs").removeClass('none');
			$(".button-box div:first-child").css('display', "none");
			refreshLocalStorage();
		}
	})
});

$(document).on('pagebeforecreate', '#favs', function(){
	$("#favs-list").empty();
	$("#favs-list").append(domStories.getFavs());
});
$(document).on('pageshow', '#favs', function(){
	$("#favs-list").empty();
	$('#favs').trigger('pagebeforecreate');
	if($("#favs-list").listview()){
		$("#favs-list").listview("refresh")
	};
	$("#favs-list").listview("refresh");
});
$(document).on('pageshow', '#config', function(){
	$("#savedUserName").val(userData.name);
	$("#fontSize").val(userData.fontSize);
	$("#fontSize").selectmenu('refresh', true);
	$("#saveConfigs").click(function(){
		userData.name = $("#savedUserName").val();
		userData.fontSize = $("#fontSize").val();		
		refreshLocalStorage();
		$('#popupConfig').popup("open");
	});
	$("#deleteAll").unbind('click').bind('click', function(event) {
		$("#deleteConfigpopup").popup("open");
		userData = {
			"firstTime" : true,
			"name" : '',
			"lastCat": '',
			"userFavs" : [],
			"fontSize" : "normal"
		};
		localStorage.setItem("userData", JSON.stringify(userData));
	})
});