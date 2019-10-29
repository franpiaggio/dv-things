/*
* Variables globales
*/
var intentos;
var numeroRandom;
var numeroUsuario;

/**
 * Función a utilizar cuando quiero generar un número aleatorio
 */
var generarRandom = function(){
    // Se genera entre 1 y 10
    numeroRandom = Math.floor( Math.random() * 10 ) + 1;
}

var comenzar = function(){
    // Genero el número a adivinar
    generarRandom()
    intentos = parseInt(prompt("¿Cuantos intentos querés?"));
    document.getElementById("intentos").innerHTML = intentos;
}

/**
 * Se ejecuta cada vez que se intente adivinar un número
 * Determinará si ganamos perdemos o seguimos jugando
 */
var jugar = function(){
    // Obtengo lo que puso el usuario
    numeroUsuario = parseInt(document.querySelectorAll("#inputAdivinar")[0].value);
    // Verifico si ganó
    if(numeroUsuario === numeroRandom){
        document.querySelectorAll('.game')[0].classList.add('hide');
        document.querySelectorAll('#win')[0].classList.remove('hide');
    }else{
        // Si no ganó, resto un intento
        intentos--;
        // Verifico si perdió
        if(intentos === 0){
            document.querySelectorAll('.game')[0].classList.add('hide');
            document.querySelectorAll('#loose')[0].classList.remove('hide');
        }else{
            // Si no perdió muestro los intentos y la pista
            document.getElementById('intentos').innerHTML = intentos;
            mostrarPista();
        }
    }
}

var mostrarPista = function(){
    if(numeroUsuario > numeroRandom){
        document.querySelectorAll('.indicador-pistas')[0].innerHTML = "Muy alto!";
    }else{
        document.querySelectorAll('.indicador-pistas')[0].innerHTML = "Muy bajo!";
    }
}

/**
 * Click en boton login
 */
document.getElementById("login").onclick = function(){
    // Cuando toca siguiente verifico si el input tiene algún dato
    var nameInput = document.querySelectorAll("#nombreInput")[0].value;
    if(nameInput === '' || nameInput === undefined){
        // Si no tiene nada, le aviso que es obligatorio completar
        alert("El nombre es obligatorio");
    }else{
        // Si tiene algo lo guardo en la variable global para usarlo cuando lo necesite
        nombreUsuario = nameInput;
        // Borro la pantalla de login para mostrar la instrucciones
        document.querySelectorAll('.intro')[0].classList.add('hide');
        // Muestro la pantalla siguiente
        document.querySelectorAll('.instructions')[0].classList.remove('hide');
        // Pongo el nombre adentro del html
        document.getElementById('nombre').innerHTML = nameInput;
    }
}

/**
 * Click en botón comenzar
 */
document.getElementById("comenzar").onclick = function(){
    // Fade out a las instrucciones
    document.querySelectorAll('.instructions')[0].classList.add('hide');
    // Muestro el juego
    document.querySelectorAll('.game')[0].classList.remove('hide');
    // Inicio el juego
    comenzar()
}

/**
 * Click en adivinar
 */
document.getElementById("botonAdivinar").onclick = jugar;